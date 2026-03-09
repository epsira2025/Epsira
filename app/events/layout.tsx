import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events & Workshops',
  description:
    'Join us at our academic conferences, workshops, and seminars focused on political science and international relations in Ethiopia.',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
