export type NodeKind = 'folder' | 'file'

export type AppUser = {
  uid: string
  email: string
  provider: 'firebase' | 'mock'
}

export type FileNodeData = {
  id: string
  name: string
  kind: NodeKind
  createdBy: string
  createdAt: number
  updatedAt: number
  children: FileNodeData[]
}
