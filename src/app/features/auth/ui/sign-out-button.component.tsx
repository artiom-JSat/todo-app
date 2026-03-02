'use client'

import { useSignOut } from '@/entities/api/auth'
import { Button } from '@/shared/ui'

export function SignOutButton() {
  const { handleSignOut } = useSignOut()

  return (
    <Button onClick={() => handleSignOut()} variant="outline" size="sm">
      Sign Out
    </Button>
  )
}
