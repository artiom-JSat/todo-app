export interface Todo {
  id: string
  user_id: string
  title: string
  completed: boolean
  created_at: string
}

export interface TodoListProps {
  initialData: Todo[]
  userId: Todo['user_id']
}

export type TodoItemProps = Pick<Todo, 'id' | 'title' | 'completed' | 'user_id'>

export type AddTodoValues = {
  title: string
}