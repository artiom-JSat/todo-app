'use client'

import {
  Button,
  Checkbox,
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/shared/ui'
import { TodoItemProps } from '../todos.interface'
import { useTodoMutations } from '../hooks'
import { useTodoActions } from '../todos.store'

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const { toggleTodo, deleteTodo, isDeleting } = useTodoMutations()
  const { setEditTodo } = useTodoActions()

  return (
    <div
      className={`transition-opacity ${isDeleting ? 'opacity-50' : 'opacity-100'}`}
    >
      <Item variant={`${completed ? 'muted' : 'outline'}`}>
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
            variant="outline"
            size="sm"
            onClick={() => setEditTodo({ id, title, completed })}
          >
            Edit
          </Button>
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
