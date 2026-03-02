'use client'

import { useUserQuery } from "@/entities/api/auth"

export function UserInfoView() {
  const { data: user } = useUserQuery()

  if (!user) return null

  return <p className="text-gray-600">Logged in as: {user?.email}</p>
}
