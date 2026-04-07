import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Task } from '../types/task'
import { useAuth } from './useAuth'
import { TasksContext, type TasksContextValue } from './TasksContextInternal'

function makeId() {
  const maybeCrypto = globalThis.crypto as unknown as { randomUUID?: () => string }
  if (maybeCrypto?.randomUUID) return maybeCrypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getStorageKey(userId: string) {
  return `tasks:${userId}`
}

function safeLoadTasks(raw: string | null): Task[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as Task[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const storageKey = useMemo(() => {
    if (!user) return null
    return getStorageKey(user.uid)
  }, [user])

  useEffect(() => {
    if (!storageKey) {
      queueMicrotask(() => {
        setTasks([])
        setLoading(false)
      })
      return
    }

    queueMicrotask(() => {
      setLoading(true)
      const next = safeLoadTasks(localStorage.getItem(storageKey))
      setTasks(next)
      setLoading(false)
    })
  }, [storageKey])

  const persist = useCallback(
    (next: Task[]) => {
      if (!storageKey) return
      localStorage.setItem(storageKey, JSON.stringify(next))
      setTasks(next)
    },
    [storageKey]
  )

  const addTask = useCallback(
    (input: { title: string; description: string }) => {
      if (!user) return
      const now = Date.now()
      const nextTask: Task = {
        id: makeId(),
        title: input.title.trim(),
        description: input.description.trim(),
        done: false,
        createdAt: now,
        updatedAt: now,
      }

      persist([nextTask, ...tasks])
    },
    [persist, tasks, user]
  )

  const updateTask = useCallback(
    (id: string, input: { title: string; description: string }) => {
      const now = Date.now()
      const next = tasks.map((t) => {
        if (t.id !== id) return t
        return {
          ...t,
          title: input.title.trim(),
          description: input.description.trim(),
          updatedAt: now,
        }
      })

      persist(next)
    },
    [persist, tasks]
  )

  const deleteTask = useCallback(
    (id: string) => {
      const next = tasks.filter((t) => t.id !== id)
      persist(next)
    },
    [persist, tasks]
  )

  const toggleTaskDone = useCallback(
    (id: string) => {
      const next = tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done, updatedAt: Date.now() } : t
      )
      persist(next)
    },
    [persist, tasks]
  )

  const value: TasksContextValue = {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

