'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '@/entities/api'
import { Todo, TodoItemProps } from '../todo.interface'
import {
  Button,
  Checkbox,
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/shared/ui'

export function TodoItem({
  id,
  title,
  completed,
  user_id: userId,
}: TodoItemProps) {
  const queryClient = useQueryClient()

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: () => todoApi.delete(`/todos/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', userId] }),
  })

  const { mutate: toggleTodo, isPending: isToggling } = useMutation({
    mutationFn: () =>
      todoApi.patch<Todo, { completed: boolean }>(`/todos/${id}`, {
        completed: !completed,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', userId] }),
  })

  const isPending = isToggling || isDeleting

  return (
    <div
      className={`flex w-full flex-col gap-6 ${isToggling ? 'opacity-50' : 'opacity-100'}`}
    >
      <Item variant="outline" className={`${completed ? 'bg-gray-100' : ''}`}>
        <Checkbox
          onClick={() => toggleTodo()}
          checked={completed}
          disabled={isPending}
          type="button"
          className='cursor-pointer'
        />
        <ItemContent>
          <ItemTitle className={`${completed ? 'line-through' : ''}`}>
            {title}
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => deleteTodo()}
            disabled={isPending}
          >
            Delete
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
