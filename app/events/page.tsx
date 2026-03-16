import type { Metadata } from 'next'
import EventsClient from './events-client'

export const metadata: Metadata = {
  title: 'Events & Workshops',
  description: 'Join EPSIRA conferences, workshops, and seminars focused on political science and international relations in Ethiopia.',
}

export default function EventsPage() {
  return <EventsClient />
}
