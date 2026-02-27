'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { todoApi } from '@/entities/api'
import { AddTodoValues, Todo } from '../todo.interface'
import { Button, Input, Spinner } from '@/shared/ui'

export function AddTodoForm() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoValues>({
    defaultValues: { title: '' },
  })

  const { mutate, isPending, error: mutationError } = useMutation({
    mutationFn: (title: string) =>
      todoApi.post<Todo, { title: string }>('/todos', { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      reset()
    },
  })

  const onSubmit = (data: AddTodoValues) => {
    mutate(data.title)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <Input
            {...register('title', { 
              required: 'Task title is required',
              minLength: { value: 2, message: 'Too short' } 
            })}
            type="text"
            placeholder="What needs to be done?"
            disabled={isPending}
            aria-invalid={!!errors.title}
          />
          <Button type="submit" disabled={isPending}>
            Add Todo
            {isPending && <Spinner data-icon="inline-start" />}
          </Button>
        </div>

        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      {mutationError && (
        <div className="text-destructive text-sm mt-2">{mutationError.message}</div>
      )}
    </form>
  )
}