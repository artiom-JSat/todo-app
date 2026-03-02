'use client'

import { useQueryClient } from '@tanstack/react-query'
import { signOut } from '@/modules/auth'

export function useSignOut() {
  const queryClient = useQueryClient()

  const handleSignOut = async () => {
    queryClient.clear()

    // useTodoStore.getState().setFilter('all')

    await signOut()
  }

  return { handleSignOut }
}