'use client'

import { useTodoStore, FilterType } from '../todo-list.store'

export function TodoFilters() {
  const { filter, setFilter } = useTodoStore()

  const buttons: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'Все' },
    { type: 'active', label: 'Активные' },
    { type: 'completed', label: 'Выполненные' },
  ]

  return (
    <div className="flex gap-2 mb-6 shadow-sm p-1 bg-gray-100 rounded-lg w-fit">
      {buttons.map((btn) => (
        <button
          key={btn.type}
          onClick={() => setFilter(btn.type)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            filter === btn.type
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}