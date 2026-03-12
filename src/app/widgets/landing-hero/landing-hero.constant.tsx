import { HeroContent } from "./landing-hero.interface"

export const HERO_CONTENT: HeroContent = {
  title: (
    <>
      Manage Tasks <br /> with Intelligence
    </>
  ),
  description: "A minimalist todo application built for speed and productivity. Syncs across all your devices in real-time.",
  actions: [
    {
      label: "Get Started",
      href: "/dashboard",
      variant: "default",
    },
    {
      label: "Learn More",
      href: "/docs",
      variant: "outline",
    },
  ],
}