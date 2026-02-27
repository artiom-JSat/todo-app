'use client'

import { useUser } from '@/shared/hooks/use-user'

export function UserInfo() {
  const { data: user } = useUser()

  if (!user) return null

  return <p className="text-gray-600">Logged in as: {user.email}</p>
}
