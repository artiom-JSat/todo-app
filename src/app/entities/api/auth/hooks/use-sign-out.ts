'use client'

import { useQueryClient } from '@tanstack/react-query'
import { signOut } from '@/modules/auth'
import { useTodoStore } from '@/modules/todos/todo-list.store'

export function useSignOut() {
  const queryClient = useQueryClient()

  const handleSignOut = async () => {
    queryClient.clear()

    useTodoStore.getState().setFilter('all')

    await signOut()
  }

  return { handleSignOut }
}