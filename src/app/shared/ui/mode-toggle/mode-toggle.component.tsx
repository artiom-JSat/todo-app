'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { Button } from '../button'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [position, setPosition] = useState('system')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem onClick={() => setTheme('light')} value={'light'} >
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem onClick={() => setTheme('dark')} value={'dark'}>
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem onClick={() => setTheme('system')} value={'system'}>
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
