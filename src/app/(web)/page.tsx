import { Suspense } from 'react'
import { UserInfo } from '@/modules/auth/elements/user-info.component'
import { signOut } from '@/modules/auth/auth.service'
import { AddTodoForm } from '@/modules/todos/elements/add-todo-form.component'
import { TodoListServer } from '@/modules/todos/elements/todo-list-server.component'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
            <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
              <UserInfo />
            </Suspense>
          </div>
          <form>
            <button
              formAction={signOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              Sign Out
            </button>
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
