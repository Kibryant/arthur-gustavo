'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'

type Category = 'web' | 'mobile' | 'api' | 'ai' | 'tooling'
type Status = 'live' | 'private' | 'archived'

interface Project {
  id: string
  index: number
  title: string
  caption: string
  year: number
  client?: string
  category: Category[]
  stack: string[]
  status: Status
  hue: number /* 0-360 */
  demo?: string
  repo?: string
  featured?: boolean
}

const PROJECTS: Project[] = [
  {
    id: 'marcapagina',
    index: 1,
    title: 'Marcapágina',
    caption:
      'Rastreador de hábitos de leitura. Timer com sons ambientes, gamificação por XP, heatmap de consistência e cards prontos para Stories.',
    year: 2026,
    category: ['web', 'fullstack' as Category],
    stack: ['TypeScript', 'Next 16', 'Postgres', 'Drizzle', 'Tailwind v4'],
    status: 'live',
    hue: 28,
    repo: 'https://github.com/Kibryant/Marcap-gina',
    featured: true,
  },
  {
    id: 'modocaverna',
    index: 2,
    title: 'Modo Caverna Mobile v2',
    caption:
      'App de produtividade focado em deep work. Rotinas, streak, conquistas e desafios de 40 dias. Reescrita completa do app legado.',
    year: 2025,
    client: 'sideral devs',
    category: ['mobile'],
    stack: ['React Native', 'Expo', 'TypeScript', 'NativeWind', 'TanStack'],
    status: 'private',
    hue: 215,
    featured: true,
  },
  {
    id: 'badejo',
    index: 3,
    title: 'Restaurante Badejo',
    caption:
      'Site institucional para restaurante com suporte completo a quatro idiomas (pt-BR, zh-CN, ja-JP, en-US) e cardápio sazonal.',
    year: 2025,
    category: ['web'],
    stack: ['Next.js', 'Tailwind', 'i18n'],
    status: 'live',
    hue: 162,
    demo: 'https://badejo.vercel.app/',
    featured: true,
  },
  {
    id: 'premium-trainer',
    index: 4,
    title: 'Premium Trainer',
    caption: 'Landing page para personal trainer focada em conversão e captura.',
    year: 2024,
    category: ['web'],
    stack: ['React', 'Next.js', 'Tailwind'],
    status: 'live',
    hue: 12,
    repo: 'https://github.com/leafartech/premium_trainer',
  },
  {
    id: 'combo-fr',
    index: 5,
    title: 'Combo FR',
    caption: 'Landing page combinada para nutricionista e personal trainer.',
    year: 2024,
    category: ['web'],
    stack: ['React', 'Next.js', 'Tailwind'],
    status: 'live',
    hue: 320,
    repo: 'https://github.com/leafartech/facilitadorderesultados',
  },
  {
    id: 'mecha-turbo-app',
    index: 6,
    title: 'DNA Mecha Turbo · App',
    caption: 'App mobile para cabeleireira com agenda, rotinas e tutoriais.',
    year: 2024,
    category: ['mobile'],
    stack: ['React Native', 'Expo', 'TypeScript'],
    status: 'live',
    hue: 290,
    repo: 'https://github.com/Kibryant/mecha-turbo-frontend',
  },
  {
    id: 'mecha-turbo-api',
    index: 7,
    title: 'DNA Mecha Turbo · API',
    caption: 'REST API para o app mobile, com auth JWT e validação tipada.',
    year: 2024,
    category: ['api'],
    stack: ['Node', 'Express', 'MongoDB', 'JWT', 'Zod'],
    status: 'live',
    hue: 144,
    repo: 'https://github.com/Kibryant/mecha-turbo-backend',
  },
  {
    id: 'planner-app',
    index: 8,
    title: 'Planner Mecha Turbo · App',
    caption: 'Planner mobile com sincronização, fila offline e tasks recorrentes.',
    year: 2024,
    category: ['mobile'],
    stack: ['React Native', 'Expo', 'Zustand', 'TanStack', 'NativeWind'],
    status: 'live',
    hue: 198,
    repo: 'https://github.com/Kibryant/planner-frontend',
  },
  {
    id: 'planner-api',
    index: 9,
    title: 'Planner Mecha Turbo · API',
    caption: 'API com Fastify, Postgres e Prisma para o planner mobile.',
    year: 2024,
    category: ['api'],
    stack: ['Node', 'Fastify', 'Postgres', 'Prisma', 'JWT'],
    status: 'live',
    hue: 222,
    repo: 'https://github.com/Kibryant/planner-backend',
  },
  {
    id: 'vilas-mkt',
    index: 10,
    title: 'Arthur Vilas Marketing',
    caption: 'Site institucional para agência de marketing.',
    year: 2024,
    category: ['web'],
    stack: ['Next.js', 'Tailwind'],
    status: 'live',
    hue: 264,
    demo: 'https://vilasmkt.com.br/',
  },
  {
    id: 'eco-casa',
    index: 11,
    title: 'Eco Casa',
    caption: 'Site para empresa de construção sustentável.',
    year: 2024,
    category: ['web'],
    stack: ['Next.js', 'Tailwind'],
    status: 'live',
    hue: 110,
    demo: 'https://eco-casa-theta.vercel.app/',
  },
  {
    id: 'marco-tulio',
    index: 12,
    title: 'Marco Túlio',
    caption: 'Sistema de leads com fluxo baseado em lead-time. Datafly Brasil.',
    year: 2025,
    client: 'datafly',
    category: ['web', 'fullstack' as Category],
    stack: ['Next 16', 'Postgres', 'Tailwind v4', 'shadcn/ui'],
    status: 'private',
    hue: 38,
  },
  {
    id: 'laboratorio-estrela',
    index: 13,
    title: 'Laboratório Estrela',
    caption: 'Plataforma operacional para laboratório clínico.',
    year: 2025,
    client: 'datafly',
    category: ['web', 'fullstack' as Category],
    stack: ['Next.js', 'Postgres', 'Tailwind'],
    status: 'private',
    hue: 348,
  },
  {
    id: 'sos-passagens',
    index: 14,
    title: 'SOS Passagens Aéreas',
    caption: 'Painel KPI e gestão para vendedores de passagens aéreas.',
    year: 2025,
    client: 'datafly',
    category: ['web'],
    stack: ['Next.js', 'ApexCharts', 'Tailwind'],
    status: 'private',
    hue: 188,
  },
  {
    id: 'systemdria',
    index: 15,
    title: 'Systemdria',
    caption: 'CRM com cálculo de receita média por cliente. Leafar Tech.',
    year: 2025,
    client: 'leafartech',
    category: ['web', 'fullstack' as Category],
    stack: ['Next.js', 'NextAuth', 'Postgres'],
    status: 'private',
    hue: 250,
  },
  {
    id: 'traffic-hlp',
    index: 16,
    title: 'Traffic HLP',
    caption: 'Painel de tráfego pago com APIs de plataformas de anúncios.',
    year: 2025,
    client: 'leafartech',
    category: ['web', 'api'],
    stack: ['Next.js', 'Drizzle ORM', 'Postgres'],
    status: 'private',
    hue: 6,
  },
  {
    id: 'beco',
    index: 17,
    title: 'Beco · Classificador',
    caption:
      'Microserviço que sugere plano de contas a partir da descrição de lançamentos. Consumido via Google Sheets.',
    year: 2025,
    client: 'rede beco',
    category: ['api', 'ai'],
    stack: ['Python', 'FastAPI', 'OpenAI'],
    status: 'private',
    hue: 80,
  },
  {
    id: 'cestaradar',
    index: 18,
    title: 'CestaRadar',
    caption: 'Monitoramento e análise de preços da cesta básica no Brasil.',
    year: 2025,
    category: ['web', 'api'],
    stack: ['Next.js', 'Postgres', 'Charts'],
    status: 'private',
    hue: 52,
  },
  {
    id: 'fastapp',
    index: 19,
    title: 'TopHawks Fastapp',
    caption:
      'Agente LangChain 1.0 com modelo dinâmico e Tavily, executado via LangGraph Studio.',
    year: 2025,
    category: ['ai'],
    stack: ['LangChain', 'LangGraph', 'Tavily', 'Next.js'],
    status: 'private',
    hue: 175,
  },
  {
    id: 'ia-life',
    index: 20,
    title: 'IA Life',
    caption: 'Dashboard com integrações de IA — produtividade pessoal.',
    year: 2025,
    category: ['web', 'ai'],
    stack: ['Next.js', 'Tailwind', 'Anthropic SDK'],
    status: 'private',
    hue: 304,
    repo: 'https://github.com/Kibryant/ia-life-web',
  },
  {
    id: 'pique-hub',
    index: 21,
    title: 'Pique Consultoria Hub',
    caption:
      'Infraestrutura replicável de consultoria. Mapeamento de pessoas, processos e entregáveis por cliente.',
    year: 2025,
    client: 'pique digital',
    category: ['tooling'],
    stack: ['HTML estático', 'GitHub Pages'],
    status: 'private',
    hue: 240,
  },
  {
    id: 'team-xavier',
    index: 22,
    title: 'Team Xavier Web',
    caption: 'Site institucional para o time Xavier.',
    year: 2025,
    category: ['web'],
    stack: ['Next.js', 'Tailwind'],
    status: 'archived',
    hue: 70,
    repo: 'https://github.com/Kibryant/team-xavier-web',
  },
]

const FILTERS: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'tudo' },
  { id: 'web', label: 'web' },
  { id: 'mobile', label: 'mobile' },
  { id: 'api', label: 'api' },
  { id: 'ai', label: 'ai' },
  { id: 'tooling', label: 'tooling' },
]

const STATUS_LABEL: Record<Status, string> = {
  live: 'live',
  private: 'private',
  archived: 'archived',
}

const STATUS_DOT: Record<Status, string> = {
  live: 'bg-live live-dot',
  private: 'bg-mark',
  archived: 'bg-muted-foreground/40',
}

function gradientFor(hue: number) {
  return `radial-gradient(120% 120% at 0% 0%, hsl(${hue} 80% 60% / 0.5), transparent 55%), radial-gradient(80% 80% at 100% 100%, hsl(${(hue + 50) % 360} 70% 55% / 0.45), transparent 60%), linear-gradient(135deg, hsl(${hue} 35% 22%), hsl(${(hue + 220) % 360} 30% 14%))`
}

function FeaturedCard({
  project,
  position,
}: {
  project: Project
  position: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: position * 0.08 }}
      className="group relative"
    >
      <a
        href={project.demo ?? project.repo ?? '#'}
        target={project.demo || project.repo ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="block"
      >
        {/* cover */}
        <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden rounded-sm grain border border-rule">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ background: gradientFor(project.hue) }}
          />
          {/* monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display italic text-[clamp(5rem,18vw,12rem)] text-white/85 leading-none mix-blend-overlay select-none">
              {project.title.charAt(0)}
            </span>
          </div>
          {/* corner index */}
          <span className="absolute top-3 left-4 meta-strong text-white/85 mix-blend-overlay">
            {String(project.index).padStart(3, '0')}
          </span>
          {/* status */}
          <span className="absolute top-3 right-4 flex items-center gap-1.5 meta-strong text-white/85 mix-blend-overlay">
            <span className={`size-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
            {STATUS_LABEL[project.status]}
          </span>
          {/* hover arrow */}
          <span className="absolute bottom-4 right-4 size-10 rounded-full bg-white/95 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        {/* meta */}
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl md:text-3xl tracking-tight group-hover:italic transition-all">
            {project.title}
          </h3>
          <span className="meta tabular-nums shrink-0">{project.year}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
          {project.caption}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {project.stack.map((tech) => (
            <span key={tech} className="meta">
              · {tech}
            </span>
          ))}
        </div>
      </a>
    </motion.article>
  )
}

function CatalogRow({ project }: { project: Project }) {
  const link = project.demo ?? project.repo
  const Wrapper = link ? 'a' : 'div'
  return (
    <Wrapper
      {...(link
        ? {
            href: link,
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      className="group grid grid-cols-12 gap-3 lg:gap-6 py-5 border-b border-rule items-baseline -mx-2 px-2 hover:bg-surface/60 transition-colors"
    >
      <span className="meta col-span-2 sm:col-span-1 tabular-nums text-muted-foreground/60">
        {String(project.index).padStart(3, '0')}
      </span>
      <span className="col-span-10 sm:col-span-5 lg:col-span-4 font-display text-xl md:text-2xl tracking-tight group-hover:italic transition-all">
        {project.title}
      </span>
      <span className="hidden lg:block lg:col-span-3 text-sm text-muted-foreground truncate">
        {project.caption.replace(/\.$/, '').split(/[—.]/)[0]}
      </span>
      <span className="hidden sm:flex sm:col-span-3 lg:col-span-2 meta gap-1 flex-wrap">
        {project.category.slice(0, 2).map((c) => (
          <span key={c} className="text-foreground/70">
            {c}
          </span>
        ))}
      </span>
      <span className="hidden sm:flex sm:col-span-2 lg:col-span-1 meta items-center gap-1.5">
        <span className={`size-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
        {STATUS_LABEL[project.status]}
      </span>
      <span className="col-span-12 sm:col-span-1 lg:col-span-1 meta tabular-nums text-right text-muted-foreground/70">
        {project.year}
        {link && (
          <span className="ml-2 inline-block opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            ↗
          </span>
        )}
      </span>
    </Wrapper>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | Category>('all')

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category.includes(filter)),
    [filter],
  )

  const featured = useMemo(
    () => filtered.filter((p) => p.featured).slice(0, 3),
    [filtered],
  )
  const catalog = useMemo(
    () => filtered.filter((p) => !p.featured),
    [filtered],
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PROJECTS.length }
    for (const p of PROJECTS) {
      for (const c of p.category) {
        map[c] = (map[c] ?? 0) + 1
      }
    }
    return map
  }, [])

  return (
    <section
      id="projeto"
      className="relative py-24 lg:py-32 container mx-auto px-6 lg:px-10"
    >
      <div className="flex items-baseline gap-4 mb-10">
        <span className="meta-strong text-primary">04</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl italic tracking-tight">
          projetos
        </h2>
        <div className="flex-1 rule mb-3" />
        <span className="meta hidden md:inline">
          / selected works · ({String(PROJECTS.length).padStart(3, '0')})
        </span>
      </div>

      {/* filter row */}
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mb-10 border-y border-rule py-3 -mx-2 px-2 overflow-x-auto">
        {FILTERS.map((f) => {
          const active = f.id === filter
          const count = counts[f.id] ?? 0
          if (count === 0 && f.id !== 'all') return null
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`relative meta-strong px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                active
                  ? 'text-background bg-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`tabular-nums ${active ? 'opacity-70' : 'opacity-50'}`}
              >
                ({String(count).padStart(2, '0')})
              </span>
            </button>
          )
        })}
      </div>

      {/* featured */}
      <AnimatePresence mode="wait">
        {featured.length > 0 && (
          <motion.div
            key={`f-${filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
          >
            {featured.map((p, i) => (
              <FeaturedCard key={p.id} project={p} position={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* catalog */}
      {catalog.length > 0 && (
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <p className="meta">/ catálogo completo</p>
            <p className="meta tabular-nums">
              ({String(catalog.length).padStart(2, '0')} resultados)
            </p>
          </div>
          <div className="border-t border-rule">
            {/* table header — hidden on small */}
            <div className="hidden sm:grid grid-cols-12 gap-3 lg:gap-6 py-2 border-b border-rule meta">
              <span className="col-span-1">#</span>
              <span className="col-span-5 lg:col-span-4">projeto</span>
              <span className="hidden lg:block lg:col-span-3">descrição</span>
              <span className="col-span-3 lg:col-span-2">categoria</span>
              <span className="col-span-2 lg:col-span-1">status</span>
              <span className="col-span-1 text-right">ano</span>
            </div>

            <AnimatePresence>
              <motion.div
                key={`c-${filter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {catalog.map((p) => (
                  <CatalogRow key={p.id} project={p} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center py-20 meta">
          nenhum projeto nesta categoria · ainda
        </p>
      )}
    </section>
  )
}
