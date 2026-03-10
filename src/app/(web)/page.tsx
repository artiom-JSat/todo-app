import { AddTodoForm, TodoList } from '@/modules/todos'
import { UserInfo } from '@/modules/user'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
              My Todos
            </h1>
            <UserInfo />
          </div>
        </div>
        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  )
}
