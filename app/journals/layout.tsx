import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journals & Publications',
  description:
    'Explore our collection of peer-reviewed journals and research papers covering political science and international relations in Ethiopia.',
}

export default function JournalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
