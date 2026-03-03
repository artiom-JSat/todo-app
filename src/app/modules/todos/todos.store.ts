import { create } from 'zustand'
import { TodoItemProps } from './todos.interface'

export type TodoFilterType = 'all' | 'active' | 'completed'

interface TodoStore {
  filter: TodoFilterType

  editingTodo: TodoItemProps | null
  editTitle: string

  setFilter: (filter: TodoFilterType) => void
  setEditingTodo: (todo: TodoItemProps | null) => void
  setEditTitle: (title: string) => void
  reset: () => void
}

const initialState = {
  filter: 'all' as const,
  editingTodo: null,
  editTitle: '',
}

export const useTodoStore = create<TodoStore>((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
  setEditingTodo: (todo) =>
    set({
      editingTodo: todo,
      editTitle: todo?.title ?? '',
    }),
  setEditTitle: (title) => set({ editTitle: title }),
  reset: () => set(initialState),
}))
