import Link from 'next/link'
import {
  Button,
  ModeToggle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/shared/ui'
import { createClient } from '@/shared/utils/supabase/server'
import { SignOutButton } from '@/features/auth/ui'
import { LanguageSwitcher } from '@/features/language-switcher'

export async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <NavigationMenu className="max-w-full w-full justify-between px-20 py-2 border-b">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {user && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/dashboard">Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>

      <div className="flex gap-2">
        <ModeToggle />
        <LanguageSwitcher />
        {user ? (
          <SignOutButton />
        ) : (
          <Button asChild size="sm">
            <Link href="/login">Sign In</Link>
          </Button>
        )}
      </div>
    </NavigationMenu>
  )
}
