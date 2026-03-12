import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/shared/utils/supabase/server'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isLoginPage = request.nextUrl.pathname.startsWith('/login')
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')

  // 1. Если пользователь НЕ залогинен и пытается зайти в Dashboard
  if (!user && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. Если пользователь ЗАЛОГИНЕН и пытается зайти на Login
  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // if (!user && !request.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (user && request.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
