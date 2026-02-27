import { Suspense } from 'react'
import { Button } from '@/shared/ui'
import { signOut } from '@/modules/auth'
import { UserInfo } from '@/entities/user'
import { AddTodoForm, TodoListServer } from '@/modules/todos'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
              My Todos
            </h1>
            <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
              <UserInfo />
            </Suspense>
          </div>
          <Button onClick={signOut} variant="outline" size="sm">
            Sign Out
          </Button>
        </div>

        <AddTodoForm />

        <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
          <TodoListServer />
        </Suspense>
      </div>
    </div>
  )
}
