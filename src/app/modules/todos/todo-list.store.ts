import { create } from 'zustand'
import { Todo } from './todo.interface'

export type TodoFilterType = 'all' | 'active' | 'completed'

interface TodoStore {
  filter: TodoFilterType
  setFilter: (filter: TodoFilterType) => void

  isModalOpen: boolean
  editData: Todo | null
  openEditModal: (todo: Todo) => void
  closeEditModal: () => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),

  isModalOpen: false,
  editData: null,
  openEditModal: (todo) => set({ isModalOpen: true, editData: todo }),
  closeEditModal: () => set({ isModalOpen: false, editData: null }),
}))
