'use client'

import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/entities/api/todos/todos-client.api'
import { Todo } from './todo.interface'

export function AddTodoForm() {
  const queryClient = useQueryClient()
  const formRef = useRef<HTMLFormElement>(null)

  const { mutate, isPending, error } = useMutation({
    mutationFn: (title: string) =>
      api.post<Todo, { title: string }>('/todos', { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      formRef.current?.reset()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutate(formData.get('title') as string)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          name="title"
          type="text"
          placeholder="What needs to be done?"
          required
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 disabled:opacity-50"
          disabled={isPending}
        />
        <button
          type="submit"
          className="w-32 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
      {error && (
        <div className="text-red-600 text-sm mt-2">{error.message}</div>
      )}
    </form>
  )
}
