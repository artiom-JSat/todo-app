'use client'

import { useUserQuery } from "@/entities/api/auth"

export function UserInfoView() {
  const { data: user, isLoading } = useUserQuery()

  if (isLoading) return <p className="text-gray-600">Loading...</p>
  
  return <p className="text-gray-600">Logged in as: {user?.email}</p>
}