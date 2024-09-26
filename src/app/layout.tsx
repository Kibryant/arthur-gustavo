import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

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
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
