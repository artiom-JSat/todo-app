'use client'

import { getSessionUser } from '@/entities/auth/auth.actions'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: () => getSessionUser(),
    staleTime: Infinity,
  })
}