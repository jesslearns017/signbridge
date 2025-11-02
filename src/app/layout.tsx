import './globals.css'
import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Providers } from './providers'
import { TestBanner } from '@/components/test-banner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif'
})

export const metadata: Metadata = {
  title: 'SignBridge - Healthcare Communication for the Deaf Community',
  description: 'HIPAA-compliant video consultations with sign language interpretation for Deaf and Hard-of-Hearing patients',
  keywords: ['healthcare', 'deaf', 'sign language', 'ASL', 'LSM', 'telemedicine', 'accessibility'],
  authors: [{ name: 'SignBridge' }],
  themeColor: '#0055CC',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${dmSerif.variable} font-sans antialiased`}>
        <TestBanner />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
