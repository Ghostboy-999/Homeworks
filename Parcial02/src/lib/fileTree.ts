import type { FileNodeData, NodeKind } from '../types'

function createId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export class TreeNode {
  id: string
  name: string
  kind: NodeKind
  createdBy: string
  createdAt: number
  updatedAt: number
  children: TreeNode[]

  constructor(input: {
    id?: string
    name: string
    kind: NodeKind
    createdBy: string
    createdAt?: number
    updatedAt?: number
    children?: TreeNode[]
  }) {
    const safeName = input.name.trim()
    if (!safeName) {
      throw new Error('El nombre no puede estar vacio.')
    }

    this.id = input.id ?? createId()
    this.name = safeName
    this.kind = input.kind
    this.createdBy = input.createdBy
    this.createdAt = input.createdAt ?? Date.now()
    this.updatedAt = input.updatedAt ?? this.createdAt
    this.children = input.children ?? []
  }

  static fromJSON(data: FileNodeData): TreeNode {
    return new TreeNode({
      id: data.id,
      name: data.name,
      kind: data.kind,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      children: data.children.map(TreeNode.fromJSON),
    })
  }

  toJSON(): FileNodeData {
    return {
      id: this.id,
      name: this.name,
      kind: this.kind,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      children: this.children.map((child) => child.toJSON()),
    }
  }

  clone(): TreeNode {
    return TreeNode.fromJSON(this.toJSON())
  }
}

export class NaryTree {
  root: TreeNode

  constructor(root: TreeNode) {
    this.root = root
  }

  static createInitial(ownerEmail: string) {
    return new NaryTree(
      new TreeNode({
        name: 'Mi unidad',
        kind: 'folder',
        createdBy: ownerEmail,
      })
    )
  }

  static fromJSON(data: FileNodeData) {
    return new NaryTree(TreeNode.fromJSON(data))
  }

  toJSON(): FileNodeData {
    return this.root.toJSON()
  }

  findById(nodeId: string, current: TreeNode = this.root): TreeNode | null {
    if (current.id === nodeId) return current

    for (const child of current.children) {
      const found = this.findById(nodeId, child)
      if (found) return found
    }

    return null
  }

  findParent(nodeId: string, current: TreeNode = this.root): TreeNode | null {
    for (const child of current.children) {
      if (child.id === nodeId) return current
      const parent = this.findParent(nodeId, child)
      if (parent) return parent
    }

    return null
  }

  addNode(parentId: string, input: { name: string; kind: NodeKind; createdBy: string }) {
    const parent = this.findById(parentId)
    if (!parent) throw new Error('No se encontro la carpeta destino.')
    if (parent.kind !== 'folder') throw new Error('Un archivo no puede tener hijos.')

    const safeName = input.name.trim()
    const duplicate = parent.children.some(
      (child) => child.name.toLowerCase() === safeName.toLowerCase()
    )
    if (duplicate) {
      throw new Error('Ya existe un elemento con ese nombre en la carpeta seleccionada.')
    }

    const child = new TreeNode({
      name: safeName,
      kind: input.kind,
      createdBy: input.createdBy,
    })

    parent.children.push(child)
    parent.updatedAt = Date.now()
    return child
  }

  renameNode(nodeId: string, nextName: string) {
    const node = this.findById(nodeId)
    if (!node) throw new Error('No se encontro el nodo a renombrar.')

    const safeName = nextName.trim()
    if (!safeName) throw new Error('El nombre no puede estar vacio.')

    const parent = this.findParent(nodeId)
    if (parent) {
      const duplicate = parent.children.some(
        (child) =>
          child.id !== nodeId && child.name.toLowerCase() === safeName.toLowerCase()
      )
      if (duplicate) {
        throw new Error('Ya existe un elemento con ese nombre en esta carpeta.')
      }
    }

    node.name = safeName
    node.updatedAt = Date.now()
  }

  deleteNode(nodeId: string) {
    if (nodeId === this.root.id) {
      throw new Error('La carpeta raiz no se puede eliminar.')
    }

    const parent = this.findParent(nodeId)
    if (!parent) throw new Error('No se encontro el nodo a eliminar.')

    parent.children = parent.children.filter((child) => child.id !== nodeId)
    parent.updatedAt = Date.now()
  }

  countFiles(current: TreeNode = this.root): number {
    const own = current.kind === 'file' ? 1 : 0
    return own + current.children.reduce((sum, child) => sum + this.countFiles(child), 0)
  }

  countFolders(current: TreeNode = this.root): number {
    const own = current.kind === 'folder' ? 1 : 0
    return own + current.children.reduce((sum, child) => sum + this.countFolders(child), 0)
  }

  countNodes(current: TreeNode = this.root): number {
    return 1 + current.children.reduce((sum, child) => sum + this.countNodes(child), 0)
  }
}
