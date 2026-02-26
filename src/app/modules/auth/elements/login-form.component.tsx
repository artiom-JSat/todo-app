'use client'

import { useActionState } from 'react'
import { signIn } from '../auth.service'
import { Button, Input, Label } from '@/shared/ui'

const initialState = { error: '' }

export function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
        />
      </div>

      {state?.error && (
        <div className="text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-md">
          {state.error}
        </div>
      )}

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  )
}
