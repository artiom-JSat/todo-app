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
import { useTodoStore } from '../todos.store'
import { useTodoMutations } from '../hooks/use-todo-mutations.hook'

export function EditTodoModal() {
  const { editingTodo, editTitle, setEditTitle, setEditingTodo } =
    useTodoStore()
  const { updateTodo, isUpdating } = useTodoMutations()

  const handleSave = () => {
    if (!editingTodo || !editTitle.trim()) return

    updateTodo(
      { 
        id: editingTodo.id, 
        title: editTitle.trim()
      },
      {
        onSuccess: () => {
          setEditingTodo(null)
        },
      },
    )
  }

  return (
    <Dialog
      open={!!editingTodo}
      onOpenChange={(open) => !open && setEditingTodo(null)}
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
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="What needs to be done?"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setEditingTodo(null)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isUpdating || !editTitle.trim()}
          >
            Save Changes
            {isUpdating && <Spinner data-icon="inline-start" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
