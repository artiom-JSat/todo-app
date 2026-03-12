import { AppPreview } from '@/shared/ui'
import { LandingHero } from '@/widgets/landing-hero';
import { LandingFeatures } from '@/widgets/landing-features';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-20 gap-30">
      <LandingHero />
      <AppPreview />
      <LandingFeatures />
    </div>
  )
}


