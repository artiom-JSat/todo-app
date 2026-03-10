'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Button } from '@/shared/ui/button'
import { GreatBritainFlag, PolandFlag, RussiaFlag } from '@/shared/assets/icons'

export function LanguageSwitcher() {
  const [language, setLanguage] = useState('english')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {language === 'english' && <GreatBritainFlag />}
          {language === 'polish' && <PolandFlag />}
          {language === 'russian' && <RussiaFlag />}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={language === 'english'}
          onCheckedChange={() => setLanguage('english')}
        >
          English
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={language === 'polish'}
          onCheckedChange={() => setLanguage('polish')}
        >
          Polski
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={language === 'russian'}
          onCheckedChange={() => setLanguage('russian')}
        >
          Русский
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
