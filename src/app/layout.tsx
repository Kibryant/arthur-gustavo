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
  title: 'Arthur Gustavo',
  description: 'Meu site pessoal',
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
