'use client'

import { useActionState } from 'react'
import { signUp } from '../auth.service'

const initialState = { error: '' }

export function SignUpForm() {
  const [state, formAction] = useActionState(signUp, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium">
          Password (min 6 characters)
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {state?.error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  )
}
