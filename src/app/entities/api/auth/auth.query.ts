'use client'

import { useQuery } from '@tanstack/react-query'
import { getSessionUser } from './auth.api'

export function useUserQuery() {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: () => getSessionUser(),
    staleTime: 0,
  })
}