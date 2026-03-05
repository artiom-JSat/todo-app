import { create } from 'zustand'
import { TodoItemProps } from './todos.interface'

export type TodosFilterType = 'all' | 'active' | 'completed'

interface TodoStore {
  filterTodos: TodosFilterType
  editTodo: TodoItemProps | null
  editTitleTodo: string

  actions: {
    setFilterTodos: (filter: TodosFilterType) => void
    setEditTodo: (todo: TodoItemProps | null) => void
    setEditTitleTodo: (title: string) => void
    setResetTodos: () => void
  }
}

const initialState = {
  filterTodos: 'all' as const,
  editTodo: null,
  editTitleTodo: '',
}

const useTodoStore = create<TodoStore>((set) => ({
  ...initialState,
  actions: {
    setFilterTodos: (filter) => set({ filterTodos: filter }),
    setEditTodo: (todo) =>
      set({
        editTodo: todo,
        editTitleTodo: todo?.title ?? '',
      }),
    setEditTitleTodo: (title) => set({ editTitleTodo: title }),
    setResetTodos: () => set(initialState),
  },
}))

export const useFilterTodos = () => useTodoStore((state) => state.filterTodos)
export const useEditTodo = () => useTodoStore((state) => state.editTodo)
export const useEditTitleTodo = () => useTodoStore((state) => state.editTitleTodo)

export const useTodoActions = () => useTodoStore((state) => (state.actions))
