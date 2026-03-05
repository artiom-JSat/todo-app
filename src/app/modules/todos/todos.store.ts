import { create } from 'zustand'
import { TodoItemProps } from './todos.interface'

export type TodosFilterType = 'all' | 'active' | 'completed'

interface TodoState {
  filterTodos: TodosFilterType
  editTodo: TodoItemProps | null
  editTitleTodo: string
}

interface TodoActions {
  setFilterTodos: (filter: TodosFilterType) => void
  setEditTodo: (todo: TodoItemProps | null) => void
  setEditTitleTodo: (title: string) => void
  setResetTodos: () => void
}

interface TodoStore extends TodoState {
  actions: TodoActions
}

const initialState: TodoState = {
  filterTodos: 'all',
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