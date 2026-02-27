'use client'

import {
  Button,
  Checkbox,
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/shared/ui'
import { TodoItemProps } from '../todo.interface'
import { useTodoMutations } from '../hooks/use-todo-mutations'

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const { toggleTodo, deleteTodo, isDeleting } = useTodoMutations()

  return (
    <div
      className={`flex w-full flex-col gap-6 transition-opacity ${isDeleting ? 'opacity-50' : 'opacity-100'}`}
    >
      <Item
        variant="outline"
        className={`${completed ? 'bg-gray-100/50' : ''}`}
      >
        <Checkbox
          onClick={() => toggleTodo({ id, completed })}
          checked={completed}
          disabled={isDeleting}
          type="button"
          className="cursor-pointer"
        />
        <ItemContent>
          <ItemTitle
            className={`${completed ? 'line-through text-muted-foreground' : ''}`}
          >
            {title}
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => deleteTodo(id)}
            disabled={isDeleting}
            className="hover:bg-destructive hover:text-white"
          >
            Delete
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
