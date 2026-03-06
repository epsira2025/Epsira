import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { MissionSection } from '@/components/home/mission-section'
import { LatestJournalsSection } from '@/components/home/latest-journals-section'
import { UpcomingEventsSection } from '@/components/home/upcoming-events-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MissionSection />
        <LatestJournalsSection />
        <UpcomingEventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
