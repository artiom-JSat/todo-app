'use client'

import { useActionState, startTransition } from 'react'
import { useForm } from 'react-hook-form'
import { signUp } from '../auth.service'
import { Button, Input, Label, Spinner } from '@/shared/ui'
import { AuthFormValues } from '../auth-form.interface'

const initialState = { error: '' }

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
          placeholder='name@example.com'
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
        />
        <p className="text-[0.8rem] text-muted-foreground">
          Must be at least 6 characters.
        </p>
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

      <Button
        type="submit"
        className="w-full"
        disabled={!isValid || isPending}
      >
        Create Account
        {isPending && <Spinner data-icon="inline-start" />}
      </Button>
    </form>
  )
}