'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserQuery } from '@/entities/api/auth'
import { todoApi } from '@/entities/api'
import { Todo } from '../todos.interface'
import { useTodoStore } from '../todos.store'

export function useTodoMutations() {
  const queryClient = useQueryClient()
  const { data: user } = useUserQuery()
  const userId = user?.id
  const queryKey = ['todos', userId]
  const setFilter = useTodoStore((state) => state.setFilter)
  const currentFilter = useTodoStore((state) => state.filter)

  const addMutation = useMutation({
    mutationFn: (title: string) => {
      return todoApi.post<Todo, { title: string }>('/todos', { title })
    },
    onMutate: async (newTitle) => {
      if (currentFilter === 'completed') {
        setFilter('all')
      }
      await queryClient.cancelQueries({ queryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey)

      queryClient.setQueryData<Todo[]>(queryKey, (old = []) => [
        {
          id: `temp-${Date.now()}`,
          title: newTitle,
          completed: false,
          user_id: userId || '',
          created_at: new Date().toISOString(),
        } as Todo,
        ...old,
      ])
      return { previousTodos }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTodos)
        queryClient.setQueryData(queryKey, context.previousTodos)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) => {
      return todoApi.patch<Todo, { completed: boolean }>(`/todos/${id}`, {
        completed: !completed,
      })
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey)

      queryClient.setQueryData<Todo[]>(queryKey, (old) =>
        old?.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo,
        ),
      )
      return { previousTodos }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTodos)
        queryClient.setQueryData(queryKey, context.previousTodos)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return todoApi.delete(`/todos/${id}`)
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey)

      queryClient.setQueryData<Todo[]>(queryKey, (old) =>
        old?.filter((todo) => todo.id !== id),
      )
      return { previousTodos }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTodos)
        queryClient.setQueryData(queryKey, context.previousTodos)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })

  return {
    addTodo: addMutation.mutate,
    isAdding: addMutation.isPending,
    toggleTodo: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
    deleteTodo: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  }
}
