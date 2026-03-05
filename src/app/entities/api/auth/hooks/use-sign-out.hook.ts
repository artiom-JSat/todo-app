'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useTodoActions } from '@/modules/todos'
import { signOut } from '@/modules/auth'

export function useSignOut() {
  const queryClient = useQueryClient()
  const { setResetTodos } = useTodoActions()

  const handleSignOut = async () => {
    queryClient.clear()
    setResetTodos()
    await signOut()
  }

  return { handleSignOut }
}
