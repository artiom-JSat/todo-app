'use client'

import { useUserQuery } from "@/entities/api/auth"

export function UserInfo() {
  const { data: user, isLoading } = useUserQuery()

  if (isLoading) return <p className="text-gray-600">Loading...</p>

  if (!user) return null
  
  return <p className="text-gray-600">Logged in as: {user?.email}</p>
}