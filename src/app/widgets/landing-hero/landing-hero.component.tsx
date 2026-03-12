import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui'
import { HERO_CONTENT } from './landing-hero.constant'

export function LandingHero() {
  const { title, description, actions } = HERO_CONTENT
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center gap-8">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight pb-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground max-w-[600px]">
        {description}
      </p>

      <div className="flex gap-4">
        {actions.map((action, index) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="lg"
            asChild
            className={
              action.variant === 'default'
                ? 'rounded-full shadow-lg shadow-primary/20'
                : 'rounded-full'
            }
          >
            <Link href={action.href} className="flex items-center">
              {action.label}
              {index === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  )
}
