'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const HIGHLIGHTS = [
  {
    label: 'shipping',
    value: '5+ anos',
    detail: 'web e mobile em produção, de POCs a produtos com base de usuários ativa.',
  },
  {
    label: 'estudando',
    value: 'UESC · ADM',
    detail: 'estudante de Administração na Universidade Estadual de Santa Cruz.',
  },
  {
    label: 'disciplina',
    value: 'fullstack',
    detail: 'do banco ao pixel — TS, Node, Go, Postgres, React, React Native.',
  },
  {
    label: 'baseado em',
    value: 'Itabuna · BA',
    detail: 'remoto, com clientes no Brasil e fora. Disponível em CET (BRT−3).',
  },
]

const TIMELINE = [
  { year: '2019', what: 'primeiros sites freelance — landing pages e e-commerce' },
  { year: '2021', what: 'foco em React e ecossistema TypeScript' },
  { year: '2023', what: 'apps mobile com React Native, primeiros backends Node em produção' },
  { year: '2025', what: 'Pique Digital, Datafly, agências — produtos com escala real' },
  { year: '2026', what: 'agora — AI agents, Go, sistemas internos' },
]

export function About() {
  return (
    <section
      id="sobre"
      className="relative py-24 lg:py-32 container mx-auto px-6 lg:px-10"
    >
      <div className="flex items-baseline gap-4 mb-16">
        <span className="meta-strong text-primary">01</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl italic tracking-tight">
          sobre
        </h2>
        <div className="flex-1 rule mb-3" />
        <span className="meta hidden md:inline">/ quem é arthur</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* left — portrait + caption */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted grain">
            <Image
              src="https://github.com/Kibryant.png"
              alt="Arthur Gustavo"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover grayscale-[20%]"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
              <p className="meta-strong">@arthurgustavk</p>
              <p className="meta opacity-70">itabuna · bahia · 2004</p>
            </div>
          </div>
        </motion.div>

        {/* right — copy + highlights */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-5 max-w-2xl"
          >
            <p className="text-2xl md:text-3xl font-display leading-snug text-balance">
              <span className="italic">Engenheiro fullstack</span> apaixonado por
              transformar ideias confusas em produtos digitais que rodam,
              escalam e geram valor.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Comecei em 2019 fazendo sites para clientes da minha cidade.
              Hoje trabalho com agências e empresas brasileiras construindo
              sistemas de verdade — dashboards de marketing, apps mobile, APIs
              e POCs com IA. Background sólido em frontend (React/Next), backend
              (Node/Go) e mobile (React Native) — mas o que importa é entender
              o problema antes do stack.
            </p>
          </motion.div>

          {/* highlight rows */}
          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-rule"
          >
            {HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="grid grid-cols-12 gap-4 py-4 border-b border-rule items-baseline group hover:bg-surface/50 transition-colors -mx-2 px-2"
              >
                <dt className="meta col-span-12 sm:col-span-3">
                  <span className="text-muted-foreground/50 tabular-nums mr-2">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </dt>
                <dd className="col-span-12 sm:col-span-3 font-display text-xl md:text-2xl italic tracking-tight">
                  {item.value}
                </dd>
                <dd className="col-span-12 sm:col-span-6 text-sm text-muted-foreground leading-relaxed">
                  {item.detail}
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          {/* tiny timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="meta mb-4">/ trajetória</p>
            <ol className="relative">
              {TIMELINE.map((t, idx) => (
                <li
                  key={t.year}
                  className="flex gap-5 pb-4 last:pb-0 relative"
                >
                  <div className="flex flex-col items-center">
                    <span className="meta-strong tabular-nums tracking-wider">
                      {t.year}
                    </span>
                    <span
                      className={`size-1.5 rounded-full mt-1 ${
                        idx === TIMELINE.length - 1
                          ? 'bg-primary'
                          : 'bg-muted-foreground/40'
                      }`}
                    />
                    {idx !== TIMELINE.length - 1 && (
                      <span className="flex-1 w-px bg-rule mt-1" />
                    )}
                  </div>
                  <p className="text-sm leading-relaxed pt-0.5 text-foreground/80">
                    {t.what}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
