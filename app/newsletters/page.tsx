import type { Metadata } from 'next'
import NewslettersClient from './newsletters-client'

export const metadata: Metadata = {
  title: 'Newsletters',
  description: 'Stay updated with EPSIRA newsletters, featuring association news, professional insights, and event announcements.',
}

export default function NewslettersPage() {
  return <NewslettersClient />
}
