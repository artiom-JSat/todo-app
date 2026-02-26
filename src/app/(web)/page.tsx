import { AddTodoForm } from '@/modules/todos/elements/add-todo-form.component'
import { createClient } from '@/shared/utils/supabase/server'
import { signOut } from '@/modules/auth/auth.service'
import { TodoList } from '@/modules/todos/elements/todo-list.component'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
            <p className="text-gray-600">Logged in as: {user?.email}</p>
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
        <TodoList initialData={todos || []} userId={user?.id} />
      </div>
    </div>
  )
}
