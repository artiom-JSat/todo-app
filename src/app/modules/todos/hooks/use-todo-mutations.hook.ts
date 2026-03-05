'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserQuery } from '@/entities/api/auth'
import { todoApi } from '@/entities/api'
import { Todo } from '../todos.interface'
import { useFilterTodos, useTodoActions } from '../todos.store'

export function useTodoMutations() {
  const queryClient = useQueryClient()
  const { data: user } = useUserQuery()
  const userId = user?.id
  const queryKey = ['todos', userId]
  const currentFilter = useFilterTodos()
  const { setFilterTodos } = useTodoActions()

  const addMutation = useMutation({
    mutationFn: (title: string) => {
      return todoApi.post<Todo, { title: string }>('/todos', { title })
    },
    onMutate: async (newTitle) => {
      if (currentFilter === 'completed') {
        setFilterTodos('all')
      }
      await queryClient.cancelQueries({ queryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey)

      queryClient.setQueryData<Todo[]>(queryKey, (old = []) => [
        {
          id: crypto.randomUUID(),
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

  const updateMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => {
      return todoApi.patch<Todo>(`/todos/${id}`, { title })
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey)

      queryClient.setQueryData<Todo[]>(queryKey, (old) => {
        return old?.map((todo) =>
          todo.id === newTodo.id ? { ...todo, title: newTodo.title } : todo,
        )
      })

      return { previousTodos }
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(queryKey, context.previousTodos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
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
    updateTodo: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    toggleTodo: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
    deleteTodo: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  }
}
