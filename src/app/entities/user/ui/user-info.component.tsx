import { createClient } from '@/shared/utils/supabase/server'

export async function UserInfo() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!user) return null

  return (
    <div>
      <p className="text-gray-600">Logged in as: {user?.email}</p>
    </div>
  )
}
