import { LandingFeature } from '../landing-features.interface'

type LandingFeatureCardProps = Pick<LandingFeature, 'title' | 'desc' | 'icon'>

export function FeatureCard({ title, desc, icon: Icon }: LandingFeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
      <Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  )
}
