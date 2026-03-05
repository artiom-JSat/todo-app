'use client'

import { useUserQuery } from '@/entities/api/auth'
import { useTodos } from '../hooks'
import { useFilterTodos } from '../todos.store'
import { TodoItem } from './todo-item.component'
import { TodoFilters } from './todo-filters.component'
import { EditTodoModal } from './edit-todo-modal.component'

export function TodoList() {
  const { data: user, isLoading: isUserLoading } = useUserQuery()
  const { data: todos = [], isLoading: isTodosLoading, isError } = useTodos()
  const filter = useFilterTodos()

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (isUserLoading || isTodosLoading) {
    return <div className="text-gray-600">Loading...</div>
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">Error loading data.</div>
    )
  }

  if (!user) return null

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
      <EditTodoModal />
    </div>
  )
}
