'use server'

import { createClient } from '@/shared/utils/supabase/server'

export async function getSessionUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? { id: user.id, email: user.email } : null
}
