export interface HeroAction {
  label: string
  href: string
  variant: 'default' | 'outline' | 'ghost'
}

export interface HeroContent {
  title: string | React.ReactNode
  description: string
  actions: HeroAction[]
}
