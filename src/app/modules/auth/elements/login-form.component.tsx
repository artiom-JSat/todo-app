'use client'

import { useActionState, startTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Label, Spinner } from '@/shared/ui'
import { signIn } from '../auth.service'
import { AuthFormValues } from '../auth-form.interface'

const initialState = { error: '' }

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signIn, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })

  const onSubmit = (data: AuthFormValues) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email format',
            },
          })}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs text-destructive">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Min length is 6 characters' },
          })}
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-xs text-destructive">
            {errors.password.message as string}
          </p>
        )}
      </div>

      {state?.error && (
        <div className="text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-md">
          {state.error}
        </div>
      )}

      <Button disabled={isPending} type="submit" className="w-full">
        Sign In
        {isPending && <Spinner data-icon="inline-start" />}
      </Button>
    </form>
  )
}
