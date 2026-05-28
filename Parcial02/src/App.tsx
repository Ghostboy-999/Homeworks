import { useMemo, useState, type FormEvent } from 'react'
import { useAuth } from './contexts/AuthContext'
import { useFileSystem } from './hooks/useFileSystem'
import type { TreeNode } from './lib/fileTree'
import type { NodeKind } from './types'
import './App.css'

type AuthMode = 'login' | 'register'

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(timestamp)
}

function countDirectFolders(node: TreeNode | null) {
  if (!node) return 0
  return node.children.filter((child) => child.kind === 'folder').length
}

function countDirectFiles(node: TreeNode | null) {
  if (!node) return 0
  return node.children.filter((child) => child.kind === 'file').length
}

function AuthScreen() {
  const { login, register, error, clearError, usingFirebase } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    clearError()

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="simple-auth-shell">
      <section className="simple-auth-card">
        <p className="eyebrow">Parcial 02</p>
        <h1>Sistema de archivos n-ario</h1>
        <p className="auth-copy">
          Inicia sesion o crea una cuenta para administrar carpetas y archivos.
        </p>

        <div className="auth-toggle" role="tablist" aria-label="Modo de autenticacion">
          <button
            className={mode === 'login' ? 'toggle-chip is-active' : 'toggle-chip'}
            type="button"
            onClick={() => {
              clearError()
              setMode('login')
            }}
          >
            Iniciar sesion
          </button>
          <button
            className={mode === 'register' ? 'toggle-chip is-active' : 'toggle-chip'}
            type="button"
            onClick={() => {
              clearError()
              setMode('register')
            }}
          >
            Registrarse
          </button>
        </div>

        <form className="stack-form" onSubmit={handleSubmit}>
          <label>
            Correo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </label>

          <label>
            Contrasena
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimo una clave simple"
            />
          </label>

          {error ? <p className="status-error">{error}</p> : null}

          <button className="primary-button" type="submit" disabled={submitting}>
            {submitting
              ? 'Procesando...'
              : mode === 'login'
                ? 'Entrar'
                : 'Crear cuenta'}
          </button>
        </form>

        <p className="status-note">
          Modo actual: {usingFirebase ? 'Firebase' : 'Local mock con localStorage'}.
        </p>
      </section>
    </main>
  )
}

function TreeBranch({
  node,
  selectedId,
  onSelect,
  depth = 0,
}: {
  node: TreeNode
  selectedId: string | null
  onSelect: (id: string) => void
  depth?: number
}) {
  return (
    <div className="tree-branch">
      <div
        className={selectedId === node.id ? 'tree-node is-selected' : 'tree-node'}
        style={{ paddingLeft: `${16 + depth * 18}px` }}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(node.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect(node.id)
          }
        }}
      >
        <span className={node.kind === 'folder' ? 'badge folder' : 'badge file'}>
          {node.kind === 'folder' ? 'Carpeta' : 'Archivo'}
        </span>
        <strong>{node.name}</strong>
      </div>

      {node.children.map((child) => (
        <TreeBranch
          key={child.id}
          node={child}
          selectedId={selectedId}
          onSelect={onSelect}
          depth={depth + 1}
        />
      ))}
    </div>
  )
}

function ExplorerScreen() {
  const { user, logout } = useAuth()
  const {
    tree,
    selectedNode,
    selectedNodeId,
    error,
    loading,
    usingFirebase,
    selectNode,
    clearError,
    createNode,
    renameNode,
    deleteNode,
  } = useFileSystem(user)

  const stats = useMemo(() => {
    if (!tree) {
      return { folders: 0, files: 0, nodes: 0 }
    }

    return {
      folders: tree.countFolders(),
      files: tree.countFiles(),
      nodes: tree.countNodes(),
    }
  }, [tree])

  async function handleCreate(kind: NodeKind) {
    if (!selectedNode) return

    const targetFolderId =
      selectedNode.kind === 'folder'
        ? selectedNode.id
        : tree?.findParent(selectedNode.id)?.id ?? null

    if (!targetFolderId) return

    const name = window.prompt(
      `Nombre del nuevo ${kind === 'folder' ? 'elemento' : 'archivo'}:`
    )

    if (!name) return
    await createNode(targetFolderId, name, kind)
  }

  async function handleRename() {
    if (!selectedNode) return

    const nextName = window.prompt('Nuevo nombre:', selectedNode.name)
    if (!nextName) return
    await renameNode(selectedNode.id, nextName)
  }

  async function handleDelete() {
    if (!selectedNode) return
    if (!window.confirm(`Eliminar "${selectedNode.name}"?`)) return
    await deleteNode(selectedNode.id)
  }

  if (loading) {
    return (
      <main className="diagnostic-shell">
        <section className="diagnostic-hero">
          <p className="eyebrow">Cargando</p>
          <h1>Preparando el explorador</h1>
          <p>Estamos recuperando la informacion del usuario actual.</p>
        </section>
      </main>
    )
  }

  if (!tree || !selectedNode) {
    return (
      <main className="diagnostic-shell">
        <section className="diagnostic-hero">
          <p className="eyebrow">Sin datos</p>
          <h1>No se pudo cargar el arbol</h1>
          <p>Recarga la pagina o vuelve a iniciar sesion.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="diagnostic-shell">
      <section className="diagnostic-hero">
        <div className="hero-topline">
          <div>
            <p className="eyebrow">Explorador</p>
            <h1>Sistema de archivos n-ario</h1>
            <p>
              Usuario activo: <strong>{user?.email}</strong>
            </p>
          </div>

          <button className="secondary-button" type="button" onClick={() => logout()}>
            Cerrar sesion
          </button>
        </div>

        <div className="diagnostic-stats">
          <article className="stat-card">
            <span>Carpetas</span>
            <strong>{stats.folders}</strong>
          </article>
          <article className="stat-card">
            <span>Archivos</span>
            <strong>{stats.files}</strong>
          </article>
          <article className="stat-card">
            <span>Nodos</span>
            <strong>{stats.nodes}</strong>
          </article>
          <article className="stat-card">
            <span>Persistencia</span>
            <strong>{usingFirebase ? 'Firebase' : 'Local'}</strong>
          </article>
        </div>
      </section>

      <section className="diagnostic-grid">
        <article className="panel">
          <div className="panel__header">
            <div>
              <h2>Arbol</h2>
              <p>Selecciona carpetas y archivos desde una vista simple.</p>
            </div>
          </div>

          <div className="tree-shell">
            <TreeBranch node={tree.root} selectedId={selectedNodeId} onSelect={selectNode} />
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <h2>Acciones</h2>
              <p>Administra carpetas y archivos sobre el nodo seleccionado.</p>
            </div>
          </div>

          <div className="action-stack">
            <button className="primary-button" type="button" onClick={() => handleCreate('folder')}>
              Crear carpeta
            </button>
            <button className="primary-button" type="button" onClick={() => handleCreate('file')}>
              Crear archivo
            </button>
            <button className="secondary-button" type="button" onClick={handleRename}>
              Renombrar
            </button>
            <button
              className="danger-button"
              type="button"
              onClick={handleDelete}
              disabled={selectedNode.id === tree.root.id}
            >
              Eliminar
            </button>
          </div>

          {error ? (
            <div className="inline-status">
              <p className="status-error">{error}</p>
              <button className="secondary-button" type="button" onClick={clearError}>
                Limpiar mensaje
              </button>
            </div>
          ) : null}
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <h2>Detalle</h2>
              <p>Informacion del nodo seleccionado.</p>
            </div>
          </div>

          <div className="detail-card">
            <p>
              <span>Nombre</span>
              <strong>{selectedNode.name}</strong>
            </p>
            <p>
              <span>Tipo</span>
              <strong>{selectedNode.kind === 'folder' ? 'Carpeta' : 'Archivo'}</strong>
            </p>
            <p>
              <span>Creado por</span>
              <strong>{selectedNode.createdBy}</strong>
            </p>
            <p>
              <span>Fecha de creacion</span>
              <strong>{formatDate(selectedNode.createdAt)}</strong>
            </p>
            <p>
              <span>Ultima actualizacion</span>
              <strong>{formatDate(selectedNode.updatedAt)}</strong>
            </p>
            <p>
              <span>Carpetas hijas</span>
              <strong>{countDirectFolders(selectedNode)}</strong>
            </p>
            <p>
              <span>Archivos hijos</span>
              <strong>{countDirectFiles(selectedNode)}</strong>
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}

export default function App() {
  const { user } = useAuth()
  return user ? <ExplorerScreen /> : <AuthScreen />
}
