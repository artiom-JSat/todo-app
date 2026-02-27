import { createClient } from '@/shared/utils/supabase/server'
import { TodoList } from './todo-list.component'

export async function TodoListServer() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <TodoList initialData={todos || []} userId={user.id} />
}
