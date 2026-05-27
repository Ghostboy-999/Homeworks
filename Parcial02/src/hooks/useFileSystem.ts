import { useEffect, useMemo, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirebaseServices } from '../firebase'
import { NaryTree } from '../lib/fileTree'
import type { AppUser, NodeKind } from '../types'

function getStorageKey(userId: string) {
  return `parcial02-tree:${userId}`
}

function readLocalTree(user: AppUser) {
  const raw = localStorage.getItem(getStorageKey(user.uid))

  if (!raw) {
    return NaryTree.createInitial(user.email)
  }

  try {
    return NaryTree.fromJSON(JSON.parse(raw))
  } catch {
    return NaryTree.createInitial(user.email)
  }
}

function persistLocalTree(user: AppUser, tree: NaryTree) {
  localStorage.setItem(getStorageKey(user.uid), JSON.stringify(tree.toJSON()))
}

async function readRemoteTree(user: AppUser) {
  const services = getFirebaseServices()
  if (!services.enabled || !services.db) return null

  try {
    const snapshot = await getDoc(doc(services.db, 'parcial02_trees', user.uid))
    if (!snapshot.exists()) return null
    return NaryTree.fromJSON(snapshot.data().root)
  } catch {
    return null
  }
}

async function persistRemoteTree(user: AppUser, tree: NaryTree) {
  const services = getFirebaseServices()
  if (!services.enabled || !services.db) return

  try {
    await setDoc(doc(services.db, 'parcial02_trees', user.uid), {
      ownerEmail: user.email,
      updatedAt: Date.now(),
      root: tree.toJSON(),
    })
  } catch {
    // Local persistence remains as a fallback.
  }
}

export function useFileSystem(user: AppUser | null) {
  const [tree, setTree] = useState<NaryTree | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const services = useMemo(() => getFirebaseServices(), [])

  useEffect(() => {
    let cancelled = false

    async function loadTree() {
      if (!user) {
        setTree(null)
        setSelectedNodeId(null)
        setLoading(false)
        return
      }

      setLoading(true)
      const localTree = readLocalTree(user)
      const remoteTree = await readRemoteTree(user)
      const currentTree = remoteTree ?? localTree

      persistLocalTree(user, currentTree)

      if (cancelled) return
      setTree(currentTree)
      setSelectedNodeId(currentTree.root.id)
      setLoading(false)
    }

    loadTree()

    return () => {
      cancelled = true
    }
  }, [user, services.enabled])

  async function sync(nextTree: NaryTree) {
    if (!user) return

    const snapshot = NaryTree.fromJSON(nextTree.toJSON())
    persistLocalTree(user, snapshot)
    await persistRemoteTree(user, snapshot)
    setTree(snapshot)
  }

  async function createNode(parentId: string, name: string, kind: NodeKind) {
    if (!tree || !user) return

    try {
      const nextTree = NaryTree.fromJSON(tree.toJSON())
      const created = nextTree.addNode(parentId, {
        name,
        kind,
        createdBy: user.email,
      })
      await sync(nextTree)
      setSelectedNodeId(created.id)
      setError(null)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo crear.')
    }
  }

  async function renameNode(nodeId: string, nextName: string) {
    if (!tree) return

    try {
      const nextTree = NaryTree.fromJSON(tree.toJSON())
      nextTree.renameNode(nodeId, nextName)
      await sync(nextTree)
      setError(null)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo renombrar.')
    }
  }

  async function deleteNode(nodeId: string) {
    if (!tree) return

    try {
      const nextTree = NaryTree.fromJSON(tree.toJSON())
      nextTree.deleteNode(nodeId)
      await sync(nextTree)
      setSelectedNodeId(nextTree.root.id)
      setError(null)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo eliminar.')
    }
  }

  const selectedNode = useMemo(() => {
    if (!tree || !selectedNodeId) return null
    return tree.findById(selectedNodeId)
  }, [selectedNodeId, tree])

  return {
    tree,
    selectedNode,
    selectedNodeId,
    error,
    loading,
    usingFirebase: services.enabled,
    selectNode: setSelectedNodeId,
    clearError: () => setError(null),
    createNode,
    renameNode,
    deleteNode,
  }
}
