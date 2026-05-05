'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'

const STATS = [
  { label: 'shipping desde', value: '2019' },
  { label: 'projetos', value: '030+' },
  { label: 'tecnologias', value: '020+' },
  { label: 'fuso horário', value: 'BRT−3' },
]

const SOCIALS = [
  {
    href: 'https://github.com/Kibryant',
    label: 'github',
    Icon: GitHubLogoIcon,
  },
  {
    href: 'https://linkedin.com/in/arthur-nascimento-714634261',
    label: 'linkedin',
    Icon: LinkedInLogoIcon,
  },
  {
    href: 'mailto:arthurgustavon@gmail.com',
    label: 'email',
    Icon: Mail,
  },
  {
    href: 'https://instagram.com/arthurgustavk',
    label: 'instagram',
    Icon: InstagramLogoIcon,
  },
]

export function Start() {
  return (
    <section
      id="inicio"
      className="relative min-h-[88vh] pt-20 pb-12 overflow-hidden"
    >
      {/* atmosphere — subtle blobs, much more restrained than before */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-mark/5 blur-[140px]"
          animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      </div>

      {/* top-right marker, like a research-paper header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute top-24 right-6 lg:right-10 hidden md:flex flex-col items-end gap-1"
      >
        <span className="meta">portfolio · v002</span>
        <span className="meta opacity-60">last shipped · today</span>
      </motion.div>

      <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-12 lg:pt-24">
        {/* left column — small caption + name */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="size-2 rounded-full bg-live live-dot" />
            <span className="meta-strong">
              currently shipping · marcapágina
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] tracking-tight"
          >
            <span className="block">Arthur</span>
            <span className="block italic text-primary -mt-2 lg:-mt-4">Gustavo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-muted-foreground text-balance"
          >
            Engenheiro fullstack construindo produtos web e mobile do
            zero — de POCs a aplicações em produção. Foco em qualidade,
            performance e detalhes que importam.
          </motion.p>

          {/* socials row, inline-mono */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 items-center"
          >
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center gap-2 meta-strong hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="size-3.5" />
                <span>{label}</span>
                <span className="opacity-30 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* right column — quick bio block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-rule space-y-4"
        >
          <p className="meta">/ short bio</p>
          <p className="text-sm leading-relaxed text-foreground/80">
            22, da Bahia. Engenheiro de software trabalhando com{' '}
            <span className="font-display italic text-foreground">
              React, Next, React Native, Node, Go
            </span>{' '}
            e o que mais o problema pedir. Estudante de Administração na UESC.
          </p>
          <div className="rule" />
          <p className="meta">/ disponibilidade</p>
          <p className="text-sm leading-relaxed text-foreground/80">
            Aceitando projetos freelance e oportunidades full-time.
            <a
              href="mailto:arthurgustavon@gmail.com"
              className="block mt-2 text-primary hover:underline underline-offset-4 decoration-1"
            >
              arthurgustavon@gmail.com →
            </a>
          </p>
        </motion.div>
      </div>

      {/* stats strip — full-width tabular row at bottom of hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="container mx-auto mt-20 lg:mt-28 px-6 lg:px-10"
      >
        <div className="border-t border-b border-rule">
          <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-rule">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 px-4 lg:px-6 py-5 group"
              >
                <dt className="meta flex items-center gap-2">
                  <span className="text-muted-foreground/50 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl md:text-4xl tabular-nums tracking-tight group-hover:text-primary transition-colors">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ delay: 1.2, duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 meta-strong"
      >
        <span>scroll</span>
        <ArrowDown className="size-3" />
      </motion.a>
    </section>
  )
}
