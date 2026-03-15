import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletters',
  description:
    'Stay updated with the latest newsletters from the Ethiopian Political Science and International Relations Association (EPSIRA).',
}

export default function NewslettersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
