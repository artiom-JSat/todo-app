import { Suspense } from 'react'
import { signOut } from '@/modules/auth/auth.service'
import { UserInfo } from '@/entities/user'
import { AddTodoForm } from '@/modules/todos/elements/add-todo-form.component'
import { TodoListServer } from '@/modules/todos/elements/todo-list-server.component'
import { Button } from '@/shared/ui'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">My Todos</h1>
            <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
              <UserInfo />
            </Suspense>
          </div>
          <form>
            <Button formAction={signOut} variant='outline' size='sm'>
              Sign Out
            </Button>
          </form>
        </div>

        <AddTodoForm />

        <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
          <TodoListServer />
        </Suspense>
      </div>
    </div>
  )
}
