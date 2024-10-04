'use client'

// import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

// export const metadata: Metadata = {
//   title: 'Arthur Gustavo',
//   description: 'Meu site pessoal',
//   keywords: [
//     'Arthur Gustavo',
//     'Arthur',
//     'Gustavo',
//     'Frontend',
//     'Developer',
//     'React',
//     'Next.js',
//     'TailwindCSS',
//     'TypeScript',
//     'Backend',
//   ],
// }

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        <NextThemesProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}
