'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui'
import { useTodoStore, TodoFilterType } from '../todos.store'

export function TodoFilters() {
  const { filter, setFilter } = useTodoStore()

  const buttons: { type: TodoFilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'active', label: 'Active' },
    { type: 'completed', label: 'Completed' },
  ]

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => setFilter(value as TodoFilterType)}
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
