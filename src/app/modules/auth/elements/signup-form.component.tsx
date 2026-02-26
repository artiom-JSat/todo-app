'use client'

import { useActionState } from 'react'
import { signUp } from '../auth.service'
import { Button, Input, Label } from '@/shared/ui'

const initialState = { error: '' }

export function SignUpForm() {
  const [state, formAction] = useActionState(signUp, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input 
          id="signup-email" 
          name="email" 
          type="email" 
          placeholder="name@example.com" 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input 
          id="signup-password" 
          name="password" 
          type="password" 
          required 
          minLength={6}
        />
        <p className="text-[0.8rem] text-muted-foreground">
          Must be at least 6 characters.
        </p>
      </div>

      {state?.error && (
        <div className="text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-md">
          {state.error}
        </div>
      )}

      <Button type="submit" variant="secondary" className="w-full">
        Create Account
      </Button>
    </form>
  )
}
