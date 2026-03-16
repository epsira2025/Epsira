import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { MissionSection } from '@/components/home/mission-section'
import { LatestJournalsSection } from '@/components/home/latest-journals-section'
import { LatestNewslettersSection } from '@/components/home/latest-newsletters-section'
import { UpcomingEventsSection } from '@/components/home/upcoming-events-section'
import { CTASection } from '@/components/home/cta-section'

export const metadata: Metadata = {
  title: 'Home | EPSIRA',
  description:
    'Advancing political science and international relations research in Ethiopia through academic publications, scholarly events, and collaborative research initiatives.',
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MissionSection />
        <LatestJournalsSection />
        <LatestNewslettersSection />
        <UpcomingEventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
