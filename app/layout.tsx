import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
})

export const metadata: Metadata = {
  title: {
    default: 'EPSIRA - Ethiopian Political Science and International Relations Association',
    template: '%s | EPSIRA',
  },
  description:
    'The Ethiopian Political Science and International Relations Association (EPSIRA) is dedicated to advancing political science and international relations research in Ethiopia.',
  keywords: [
    'EPSIRA',
    'Ethiopian Political Science',
    'International Relations',
    'Ethiopia',
    'Research',
    'Academic Journals',
    'Political Science Association',
  ],
  authors: [{ name: 'EPSIRA' }],
  creator: 'EPSIRA',
  icons: {
    icon: [
      { url: '/Logo EPSIRA .png', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://epsira.org',
    title: 'EPSIRA - Ethiopian Political Science and International Relations Association',
    description:
      'Advancing political science and international relations research in Ethiopia through academic publications and scholarly events.',
    siteName: 'EPSIRA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPSIRA - Ethiopian Political Science and International Relations Association',
    description:
      'Advancing political science and international relations research in Ethiopia.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1e40af',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EPSIRA - Ethiopian Political Science and International Relations Association',
    alternateName: 'EPSIRA',
    url: 'https://epsira.org',
    logo: 'https://epsira.org/Logo EPSIRA .png',
    description: 'Advancing political science and international relations research in Ethiopia through academic publications and scholarly events.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Ethiopia',
    },
    sameAs: [
      // Add social media links here
    ],
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
