import Link from 'next/link'
import { Button } from '@/shared/ui'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-20 gap-30">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight pb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Manage Tasks <br /> with Intelligence
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          A minimalist todo application built for speed and productivity. Syncs
          across all your devices in real-time.
        </p>

        <div className="flex gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full shadow-lg shadow-primary/20 text-lg"
          >
            <Link href="/dashboard" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full">
            Learn More
          </Button>
        </div>
      </section>

      {/* Декоративный элемент / Скриншот */}
      <section className="border bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl max-w-3xl w-full mx-auto">
        {/* Мини-шапка окна */}
        <div className="h-10 bg-muted/40 w-full flex items-center px-4 border-b">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
        </div>

        {/* Контент: простой список дел */}
        <div className="p-6 md:p-10 space-y-4">
          {/* Заголовок внутри карточки */}
          <div className="h-6 w-40 bg-primary/20 rounded-md mb-8" />

          {/* Строки задач */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border rounded-xl bg-background/50"
            >
              {/* Чекбокс */}
              <div
                className={`h-6 w-6 rounded-md border-2 ${i === 1 ? 'border-primary bg-primary/10' : 'border-muted'}`}
              />

              {/* Полоски текста разной длины */}
              <div className="space-y-2 flex-1">
                <div
                  className={`h-3 ${i === 1 ? 'w-1/2' : 'w-3/4'} bg-muted rounded`}
                />
                {i === 1 && <div className="h-2 w-1/4 bg-muted/50 rounded" />}
              </div>

              {/* Маленький бейдж (тег) справа */}
              <div className="h-5 w-12 bg-muted rounded-full hidden sm:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Real-time Sync"
            desc="Every change is instantly saved and synced with Supabase."
          />
          <FeatureCard
            title="Modern Stack"
            desc="Built with Next.js 15, TanStack Query and FSD architecture."
          />
          <FeatureCard
            title="Clean UI"
            desc="Powered by Shadcn UI for a consistent and accessible experience."
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
      <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  )
}
