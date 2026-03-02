import { create } from 'zustand'
import { Todo } from './todo.interface'

export type FilterType = 'all' | 'active' | 'completed'

interface TodoStore {
  filter: FilterType
  setFilter: (filter: FilterType) => void

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