import { CheckCircle2, Zap, Shield } from 'lucide-react'
import { LandingFeature } from './landing-features.interface'

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: 'sync',
    title: 'Real-time Sync',
    desc: 'Every change is instantly saved and synced with Supabase.',
    icon: Zap,
  },
  {
    id: 'stack',
    title: 'Modern Stack',
    desc: 'Built with Next.js 15, TanStack Query and FSD architecture.',
    icon: Shield,
  },
  {
    id: 'ui',
    title: 'Clean UI',
    desc: 'Powered by Shadcn UI for a consistent and accessible experience.',
    icon: CheckCircle2,
  },
]
