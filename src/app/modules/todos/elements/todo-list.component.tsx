'use client'

import { useQuery } from '@tanstack/react-query'
import { todoApi } from '@/entities/api'
import { useTodoStore } from '../todos.store'
import { TodoItem } from './todo-item.component'
import { Todo, TodoItemProps } from '../todos.interface'
import { TodoFilters } from './todo-filters.component'

export function TodoList({
  initialData,
  userId,
}: {
  initialData: Todo[]
  userId: Todo['user_id']
}) {
  const filter = useTodoStore((state) => state.filter)

  const { data: todos = [] } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => todoApi.get<TodoItemProps[]>('/todos'),
    initialData: initialData,
    enabled: !!userId,
  })

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="space-y-4">
      <TodoFilters />

      <div className="space-y-2">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <TodoItem key={todo.id} {...todo} />)
        ) : (
          <p className="text-gray-400 text-center py-8">
            {filter === 'all'
              ? 'No todos yet. Add one above!'
              : `No ${filter} todos found.`}
          </p>
        )}
      </div>
    </div>
  )
}
