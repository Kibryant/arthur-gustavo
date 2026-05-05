'use client'

import { motion } from 'framer-motion'

const NOW = [
  {
    label: 'shipping',
    title: 'Marcapágina',
    desc: 'Reading-tracker com gamificação, heatmap de consistência e sharing cards. TS · Next 16 · Postgres.',
    status: 'live',
  },
  {
    label: 'consultoria',
    title: 'Pique Digital',
    desc: 'Hub de consultoria — mapeamento de pessoas, processos e entregáveis por cliente.',
    status: 'wip',
  },
  {
    label: 'agência',
    title: 'Datafly Brasil',
    desc: 'Painéis de marketing e automações para SOS Passagens, Marco Túlio, Lab Estrela.',
    status: 'live',
  },
  {
    label: 'estudando',
    title: 'AI Agents · Go',
    desc: 'LangGraph, LangChain e Hono. Microserviços performáticos.',
    status: 'study',
  },
]

const STATUS_STYLE: Record<string, string> = {
  live: 'bg-live live-dot',
  wip: 'bg-mark',
  study: 'bg-primary',
}

const STATUS_LABEL: Record<string, string> = {
  live: 'em produção',
  wip: 'em construção',
  study: 'estudando',
}

export function Currently() {
  return (
    <section
      id="currently"
      className="relative py-20 lg:py-28 container mx-auto px-6 lg:px-10"
    >
      <div className="flex items-baseline gap-4 mb-12">
        <span className="meta-strong text-primary">02</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl italic tracking-tight">
          agora
        </h2>
        <div className="flex-1 rule mb-3" />
        <span className="meta hidden md:inline">/ status report</span>
      </div>

      <p className="meta mb-8">
        atualizado em{' '}
        <span className="text-foreground">
          {new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </p>

      <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
        {NOW.map((item, idx) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group relative bg-background p-6 lg:p-8 hover:bg-surface/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="meta">
                <span className="text-muted-foreground/50 mr-2 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {item.label}
              </span>
              <span className="flex items-center gap-2 meta-strong">
                <span
                  className={`size-1.5 rounded-full ${STATUS_STYLE[item.status]}`}
                />
                {STATUS_LABEL[item.status]}
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-2 group-hover:italic transition-all">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              {item.desc}
            </p>

            {/* hover indicator — corner mark */}
            <span className="absolute top-4 right-4 size-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.article>
        ))}
      </div>
    </section>
  )
}
