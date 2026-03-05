'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Spinner,
  DialogDescription,
} from '@/shared/ui'
import { useEditTitleTodo, useEditTodo, useTodoActions } from '../todos.store'
import { useTodoMutations } from '../hooks/use-todo-mutations.hook'

export function EditTodoModal() {
  const editTodo = useEditTodo()
  const editTitleTodo = useEditTitleTodo()
  const { setEditTodo, setEditTitleTodo } = useTodoActions()
  const { updateTodo, isUpdating } = useTodoMutations()

  const handleSave = () => {
    if (!editTodo || !editTitleTodo.trim()) return

    updateTodo(
      {
        id: editTodo.id,
        title: editTitleTodo.trim(),
      },
      {
        onSuccess: () => {
          setEditTodo(null)
        },
      },
    )
  }

  return (
    <Dialog
      open={!!editTodo}
      onOpenChange={(open) => !open && setEditTodo(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update the title of your task below.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Input
            value={editTitleTodo}
            onChange={(e) => setEditTitleTodo(e.target.value)}
            placeholder="What needs to be done?"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setEditTodo(null)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isUpdating || !editTitleTodo.trim()}
          >
            Save Changes
            {isUpdating && <Spinner data-icon="inline-start" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
