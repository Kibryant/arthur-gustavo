import type { Metadata } from 'next'
import { Geist, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Provider } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

import './styles/globals.css'
import './styles/swiper.css'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Arthur Gustavo — Fullstack Engineer',
  description:
    'Portfólio de Arthur Gustavo. Construindo produtos web e mobile desde 2019, em Itabuna, Bahia.',
  keywords: [
    'Arthur Gustavo',
    'Fullstack',
    'Frontend',
    'Backend',
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Brazil',
    'Bahia',
  ],
  openGraph: {
    title: 'Arthur Gustavo — Fullstack Engineer',
    description: 'Construindo produtos web e mobile desde 2019, em Itabuna, Bahia.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth ${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  )
}
