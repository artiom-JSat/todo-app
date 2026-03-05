'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui'
import { useFilterTodos, TodosFilterType, useTodoActions } from '../todos.store'

export function TodoFilters() {
  const filterTodos = useFilterTodos()
  const { setFilterTodos } = useTodoActions()

  const buttons: { type: TodosFilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'active', label: 'Active' },
    { type: 'completed', label: 'Completed' },
  ]

  return (
    <Tabs
      value={filterTodos}
      onValueChange={(value) => setFilterTodos(value as TodosFilterType)}
      className="w-full items-center"
    >
      <TabsList className="grid w-fit grid-cols-3">
        {buttons.map((btn) => (
          <TabsTrigger
            key={btn.type}
            value={btn.type}
            className="cursor-pointer"
          >
            {btn.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
