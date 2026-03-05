'use client'

import { getTodos } from '@/entities/api'
import { useUserQuery } from '@/entities/api/auth'
import { useQuery } from '@tanstack/react-query'

export const TODOS_QUERY_KEY = ['todos']

export const useTodos = () => {
  const { data: user } = useUserQuery()

  return useQuery({
    queryKey: [...TODOS_QUERY_KEY, user?.id],
    queryFn: getTodos,
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
    gcTime: user?.id ? 1000 * 60 * 60 : 0
  })
}