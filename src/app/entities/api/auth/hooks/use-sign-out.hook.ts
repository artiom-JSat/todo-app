'use client'

import { useQueryClient } from '@tanstack/react-query'
import { signOut } from '@/modules/auth'
import { useTodoStore } from '@/modules/todos/todos.store'

export function useSignOut() {
  const queryClient = useQueryClient()
  const resetTodos = useTodoStore((state) => state.reset)

  const handleSignOut = async () => {
    queryClient.clear()
    resetTodos()
    await signOut()
  }

  return { handleSignOut }
}
