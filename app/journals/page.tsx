import type { Metadata } from 'next'
import JournalsClient from './journals-client'

export const metadata: Metadata = {
  title: 'Journals & Publications',
  description: 'Explore peer-reviewed academic journals and research papers on Ethiopian political science and international relations.',
}

export default function JournalsPage() {
  return <JournalsClient />
}
