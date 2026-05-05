'use client'

import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import { Mail } from 'lucide-react'
import Link from 'next/link'

const NAV = [
  { label: 'sobre', href: '#sobre' },
  { label: 'agora', href: '#currently' },
  { label: 'stack', href: '#skills' },
  { label: 'projetos', href: '#projeto' },
  { label: 'contato', href: '#contato' },
  { label: 'blog', href: '/blog' },
]

const SOCIALS = [
  {
    label: 'github',
    href: 'https://github.com/Kibryant',
    Icon: GitHubLogoIcon,
  },
  {
    label: 'linkedin',
    href: 'https://linkedin.com/in/arthur-nascimento-714634261',
    Icon: LinkedInLogoIcon,
  },
  {
    label: 'instagram',
    href: 'https://instagram.com/arthurgustavk',
    Icon: InstagramLogoIcon,
  },
  {
    label: 'email',
    href: 'mailto:arthurgustavon@gmail.com',
    Icon: Mail,
  },
]

const COLOPHON = [
  ['type', 'Geist · Instrument Serif · JetBrains Mono'],
  ['stack', 'Next.js 16 · React 19 · Tailwind v4'],
  ['hosting', 'Vercel · Postgres'],
  ['source', 'github.com/Kibryant'],
]

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-rule bg-surface/40">
      <div className="container mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-10">
        {/* signature */}
        <div className="lg:col-span-5 space-y-6">
          <Link
            href="/"
            className="inline-block font-display italic text-5xl md:text-6xl tracking-tight hover:text-primary transition-colors"
          >
            arthur.
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
            Engenheiro fullstack baseado em Itabuna, BA. Disponível para
            colaborações que importam.
          </p>
          <a
            href="mailto:arthurgustavon@gmail.com"
            className="inline-flex items-center gap-2 group"
          >
            <span className="text-2xl md:text-3xl font-display italic underline underline-offset-4 decoration-primary/40 group-hover:decoration-primary transition-colors">
              arthurgustavon@gmail.com
            </span>
            <span className="text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              ↗
            </span>
          </a>
        </div>

        {/* sitemap */}
        <div className="lg:col-span-3">
          <p className="meta mb-4">/ navegação</p>
          <ul className="space-y-2">
            {NAV.map((item, idx) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-3 text-base hover:text-primary transition-colors"
                >
                  <span className="meta tabular-nums text-muted-foreground/50 w-6">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                  <span className="opacity-0 group-hover:opacity-50 transition-opacity">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* socials */}
        <div className="lg:col-span-2">
          <p className="meta mb-4">/ social</p>
          <ul className="space-y-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-base hover:text-primary transition-colors"
                >
                  <Icon className="size-3.5" />
                  <span>{label}</span>
                  <span className="opacity-0 group-hover:opacity-50 transition-opacity">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* colophon */}
        <div className="lg:col-span-2">
          <p className="meta mb-4">/ colofão</p>
          <dl className="space-y-2 text-xs">
            {COLOPHON.map(([key, value]) => (
              <div key={key}>
                <dt className="meta">{key}</dt>
                <dd className="text-muted-foreground/90 leading-snug">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-rule">
        <div className="container mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="meta">
            © {new Date().getFullYear()} · arthur gustavo · all good
          </p>
          <p className="meta flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-live live-dot" />
            shipping from itabuna · ba · br
          </p>
        </div>
      </div>

      {/* big decorative title */}
      <div
        aria-hidden
        className="select-none pointer-events-none overflow-hidden -mt-2"
      >
        <p className="font-display italic text-foreground/[0.04] text-[clamp(6rem,22vw,18rem)] leading-[0.8] tracking-tighter px-6 lg:px-10 whitespace-nowrap">
          arthurgustavo
        </p>
      </div>
    </footer>
  )
}
