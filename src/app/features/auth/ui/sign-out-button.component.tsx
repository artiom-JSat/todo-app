'use client'

import { Button } from '@/shared/ui'
import { useSignOut } from '@/entities/api/auth'

export function SignOutButton() {
  const { handleSignOut } = useSignOut()

  return (
    <Button onClick={() => handleSignOut()} variant="outline" size="sm">
      Sign Out
    </Button>
  )
}
