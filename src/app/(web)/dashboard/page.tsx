import { AddTodoForm, TodoList } from '@/modules/todos'
import { UserInfo } from '@/modules/user'

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="scroll-m-20 text-left text-3xl md:text-4xl font-extrabold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {/* <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"> */}
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
