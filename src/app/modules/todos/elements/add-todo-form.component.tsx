'use client'

import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '@/entities/api'
import { Todo } from '../todo.interface'
import { Button, Input, Spinner } from '@/shared/ui'

export function AddTodoForm() {
  const queryClient = useQueryClient()
  const formRef = useRef<HTMLFormElement>(null)

  const { mutate, isPending, error } = useMutation({
    mutationFn: (title: string) =>
      todoApi.post<Todo, { title: string }>('/todos', { title }),
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
        <Input
          name="title"
          type="text"
          placeholder="What needs to be done?"
          required
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          Add Todo
          {isPending && <Spinner data-icon="inline-start" />}
        </Button>
      </div>
      {error && (
        <div className="text-red-600 text-sm mt-2">{error.message}</div>
      )}
    </form>
  )
}
