import { FeatureCard } from './elements'
import { LANDING_FEATURES } from './landing-features.constant'

export function LandingFeatures() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {LANDING_FEATURES.map((feature) => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          desc={feature.desc}
          icon={feature.icon}
        />
      ))}
    </section>
  )
}
