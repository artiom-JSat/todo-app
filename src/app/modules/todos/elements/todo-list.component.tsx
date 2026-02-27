'use client'

import { useQuery } from '@tanstack/react-query'
import { todoApi } from '@/entities/api'
import { TodoItem } from './todo-items.component'
import { Todo, TodoItemProps } from '../todo.interface'

export function TodoList({
  initialData,
  userId,
}: {
  initialData: Todo[]
  userId: Todo['user_id']
}) {
  const { data: todos } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => todoApi.get<TodoItemProps[]>('/todos'),
    initialData: initialData,
  })
  
  return (
    <div className="space-y-2">
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} user_id={userId} />
        ))
      ) : (
        <p className="text-gray-400 text-center py-8">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
