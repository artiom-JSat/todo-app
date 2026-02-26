'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/entities/api/todos/todos-client.api'
import { Todo, TodoItemProps } from './todo.interface'

export function TodoItem({
  id,
  title,
  completed,
  user_id: userId,
}: TodoItemProps) {
  const queryClient = useQueryClient()

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: () => api.delete(`/todos/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', userId] }),
  })

  const { mutate: toggleTodo, isPending: isToggling } = useMutation({
    mutationFn: () => api.patch<Todo, { completed: boolean }>(`/todos/${id}`, { completed: !completed }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', userId] }),
  })

  const isPending = isToggling || isDeleting

  return (
    <div
      className={`flex items-center gap-3 p-4 text-gray-900 bg-gray-100 border border-gray-200 rounded-md transition-opacity ${isToggling ? 'opacity-50' : 'opacity-100'}`}
    >
      <button
        onClick={() => toggleTodo()}
        disabled={isPending}
        type="button"
        className="flex items-center justify-center"
      >
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer bg-blue-600 border-blue-600 hover:bg-blue-700 ${
            completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
          }`}
        >
          {completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </button>
      <span
        className={`flex-1 transition-all ${completed ? 'line-through text-gray-400' : ''}`}
      >
        {title}
      </span>
      <button
        onClick={() => deleteTodo()}
        disabled={isPending}
        type="button"
        className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50 cursor-pointer"
      >
        Delete
      </button>
    </div>
  )
}
