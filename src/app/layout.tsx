import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Provider } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

import './styles/globals.css'
import './styles/swiper.css'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Arthur Gustavo - Desenvolvedor Full Stack',
  description: 'Portfólio de Arthur Gustavo, desenvolvedor especializado em React, Next.js e TypeScript',
  keywords: [
    'Arthur Gustavo',
    'Arthur',
    'Gustavo',
    'Frontend',
    'Developer',
    'React',
    'Next.js',
    'TailwindCSS',
    'TypeScript',
    'Backend',
  ],
  openGraph: {
    title: 'Arthur Gustavo - Desenvolvedor',
    description: 'Confira meus projetos e habilidades',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        <Provider>{children}</Provider>

        <Toaster />
      </body>
    </html>
  )
}
