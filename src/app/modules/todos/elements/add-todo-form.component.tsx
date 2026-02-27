'use client'

import { useForm } from 'react-hook-form'
import { Button, Input, Spinner } from '@/shared/ui'
import { AddTodoValues } from '../todo.interface'
import { useTodoMutations } from '../hooks/use-todo-mutations'

export function AddTodoForm() {
  const { addTodo, isAdding } = useTodoMutations()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoValues>({
    defaultValues: { title: '' },
  })

  const onSubmit = (data: AddTodoValues) => {
    addTodo(data.title)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <Input
            {...register('title', {
              required: 'Task title is required',
              minLength: { value: 2, message: 'Too short' },
            })}
            type="text"
            placeholder="What needs to be done?"
            disabled={isAdding}
            aria-invalid={!!errors.title}
          />
          <Button type="submit" disabled={isAdding}>
            Add Todo
            {isAdding && <Spinner data-icon="inline-start" />}
          </Button>
        </div>

        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>
    </form>
  )
}
