import { createContext } from 'react'
import type { Task } from '../types/task'

export type TasksContextValue = {
  tasks: Task[]
  loading: boolean
  addTask: (input: { title: string; description: string }) => void
  updateTask: (id: string, input: { title: string; description: string }) => void
  deleteTask: (id: string) => void
  toggleTaskDone: (id: string) => void
}

export const TasksContext = createContext<TasksContextValue | undefined>(undefined)

