import { useState, type FormEvent } from 'react'
import { useTasks } from '../contexts/useTasks'
import type { Task } from '../types/task'

export default function TasksPage() {
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTaskDone } =
    useTasks()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  function resetEditor() {
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
  }

  function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ title, description })
    setTitle('')
    setDescription('')
  }

  function handleSaveEdit(e: FormEvent) {
    e.preventDefault()
    if (!editingId) return
    updateTask(editingId, { title: editTitle, description: editDescription })
    resetEditor()
  }

  function renderTask(task: Task) {
    const isEditing = editingId === task.id

    if (isEditing) {
      return (
        <div className="card app-task-card mb-3" key={task.id}>
          <div className="card-body">
            <form onSubmit={handleSaveEdit}>
              <div className="d-flex flex-column gap-2">
                <input
                  className="form-control app-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
                <input
                  className="form-control app-input"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary btn-sm" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-outline-light btn-sm"
                  type="button"
                  onClick={resetEditor}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

    return (
      <div className="card app-task-card mb-3" key={task.id}>
        <div className="card-body">
          <div className="d-flex align-items-start gap-3">
            <input
              className="form-check-input mt-1"
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTaskDone(task.id)}
              aria-label="Toggle task done"
            />
            <div className="flex-grow-1">
              <div
                className={
                  task.done ? 'fw-semibold text-decoration-line-through' : 'fw-semibold'
                }
              >
                {task.title}
              </div>
              {task.description ? (
                <div className={task.done ? 'text-decoration-line-through' : ''}>
                  {task.description}
                </div>
              ) : null}
            </div>
            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => {
                  setEditingId(task.id)
                  setEditTitle(task.title)
                  setEditDescription(task.description)
                }}
                type="button"
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h2 className="mb-3">Your Tasks</h2>

      <div className="card app-card mb-4">
        <div className="card-body">
          <form onSubmit={handleAdd} className="app-form">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control app-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Buy groceries"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                className="form-control app-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional details"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Add Task
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="text-muted">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-muted">No tasks yet. Create your first one.</div>
      ) : (
        <div>{tasks.map(renderTask)}</div>
      )}
    </div>
  )
}

