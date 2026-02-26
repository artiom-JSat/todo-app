'use client'

import { useQuery } from '@tanstack/react-query'
import { TodoItem } from './todo-items.component'
import { api } from '@/entities/api/todos/todos-client.api'
import { Todo, TodoItemProps } from './todo.interface'

export function TodoList({ initialData, userId }: { initialData: Todo[], userId: Todo['user_id'] }) {
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => api.get<TodoItemProps[]>('/todos'),
    initialData: initialData,
  })

  return (
    <div className="space-y-2">
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            user_id={userId}
          />
        ))
      ) : (
        <p className="text-gray-400 text-center py-8">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
