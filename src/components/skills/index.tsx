'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type Level = 'daily' | 'comfortable' | 'familiar'

const LEVEL_LABEL: Record<Level, string> = {
  daily: 'daily',
  comfortable: 'comfortable',
  familiar: 'familiar',
}

const LEVEL_DOTS: Record<Level, number> = {
  daily: 3,
  comfortable: 2,
  familiar: 1,
}

interface Tech {
  name: string
  level: Level
  note?: string
}

interface Group {
  id: string
  label: string
  caption: string
  items: Tech[]
}

const GROUPS: Group[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    caption: 'interfaces que importam — do markup ao framer-motion',
    items: [
      { name: 'TypeScript', level: 'daily', note: 'tipo é primeiro pensamento' },
      { name: 'React 19', level: 'daily' },
      { name: 'Next.js 16', level: 'daily', note: 'app router, server actions' },
      { name: 'Tailwind v4', level: 'daily' },
      { name: 'shadcn/ui', level: 'daily' },
      { name: 'Framer Motion', level: 'daily' },
      { name: 'TanStack Query', level: 'daily' },
      { name: 'React Hook Form', level: 'daily' },
      { name: 'Zustand', level: 'comfortable' },
      { name: 'Vue.js', level: 'familiar' },
      { name: 'Figma', level: 'comfortable' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    caption: 'APIs, autenticação, integrações e serviços',
    items: [
      { name: 'Node.js', level: 'daily' },
      { name: 'Fastify', level: 'comfortable' },
      { name: 'Hono', level: 'comfortable' },
      { name: 'Express', level: 'comfortable' },
      { name: 'Go', level: 'comfortable', note: 'microserviços performáticos' },
      { name: 'Python', level: 'comfortable', note: 'fastapi, automações' },
      { name: 'Java', level: 'familiar', note: 'spring boot' },
      { name: 'Bun', level: 'comfortable' },
      { name: 'JWT / Auth.js', level: 'daily' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    caption: 'modelagem, queries, otimização',
    items: [
      { name: 'PostgreSQL', level: 'daily' },
      { name: 'Prisma', level: 'daily' },
      { name: 'Drizzle ORM', level: 'comfortable' },
      { name: 'MongoDB', level: 'comfortable' },
      { name: 'Redis', level: 'comfortable' },
      { name: 'Supabase', level: 'comfortable' },
      { name: 'Neon', level: 'comfortable' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    caption: 'react native + expo, iOS e android',
    items: [
      { name: 'React Native', level: 'daily' },
      { name: 'Expo', level: 'daily', note: 'router, eas, native modules' },
      { name: 'NativeWind', level: 'daily' },
      { name: 'React Native Reanimated', level: 'comfortable' },
    ],
  },
  {
    id: 'ai',
    label: 'AI / Tooling',
    caption: 'agentes, automação, infra de dev',
    items: [
      { name: 'LangChain', level: 'comfortable' },
      { name: 'LangGraph', level: 'comfortable' },
      { name: 'Tavily', level: 'comfortable' },
      { name: 'Anthropic SDK', level: 'comfortable' },
      { name: 'Docker', level: 'comfortable' },
      { name: 'Turbopack', level: 'daily' },
      { name: 'GitHub Actions', level: 'comfortable' },
    ],
  },
]

function LevelDots({ level }: { level: Level }) {
  const filled = LEVEL_DOTS[level]
  const color =
    level === 'daily'
      ? 'bg-primary'
      : level === 'comfortable'
        ? 'bg-foreground/70'
        : 'bg-muted-foreground/40'
  return (
    <span className="inline-flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`size-1.5 rounded-full ${i < filled ? color : 'bg-muted-foreground/20'}`}
        />
      ))}
    </span>
  )
}

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string>('frontend')
  const [hovered, setHovered] = useState<string | null>(null)
  const current = GROUPS.find((g) => g.id === activeGroup) ?? GROUPS[0]

  return (
    <section
      id="skills"
      className="relative py-24 lg:py-32 container mx-auto px-6 lg:px-10"
    >
      <div className="flex items-baseline gap-4 mb-12">
        <span className="meta-strong text-primary">03</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl italic tracking-tight">
          stack
        </h2>
        <div className="flex-1 rule mb-3" />
        <span className="meta hidden md:inline">/ ferramentas do dia-a-dia</span>
      </div>

      {/* level legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 meta">
        {(['daily', 'comfortable', 'familiar'] as Level[]).map((lv) => (
          <span key={lv} className="flex items-center gap-2">
            <LevelDots level={lv} />
            <span>{LEVEL_LABEL[lv]}</span>
          </span>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* left — group nav */}
        <nav className="lg:col-span-4">
          <ul className="border-t border-rule">
            {GROUPS.map((g, idx) => {
              const active = g.id === activeGroup
              return (
                <li key={g.id}>
                  <button
                    type="button"
                    onClick={() => setActiveGroup(g.id)}
                    className="w-full text-left flex items-baseline gap-3 py-4 border-b border-rule group hover:bg-surface/60 transition-colors -mx-2 px-2"
                  >
                    <span className="meta tabular-nums text-muted-foreground/60 w-6">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-2xl md:text-3xl tracking-tight transition-all ${active ? 'italic text-primary' : 'group-hover:italic'}`}
                    >
                      {g.label}
                    </span>
                    <span className="ml-auto meta tabular-nums">
                      ({String(g.items.length).padStart(2, '0')})
                    </span>
                    <motion.span
                      className="text-primary opacity-0 group-hover:opacity-60 transition-opacity"
                      animate={active ? { x: 0, opacity: 1 } : {}}
                    >
                      →
                    </motion.span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* right — tech list */}
        <div className="lg:col-span-8">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-base md:text-lg text-muted-foreground italic mb-8 max-w-md">
              {current.caption}
            </p>

            <div className="border-t border-rule">
              {current.items.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  onMouseEnter={() => setHovered(tech.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="grid grid-cols-12 gap-2 py-3 border-b border-rule items-baseline group hover:bg-surface/40 -mx-2 px-2 transition-colors cursor-default"
                >
                  <span className="meta tabular-nums col-span-1 text-muted-foreground/50 hidden sm:block">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="col-span-7 sm:col-span-5 text-base font-medium tracking-tight">
                    {tech.name}
                  </span>
                  <span className="col-span-2 sm:col-span-2 flex items-center justify-end sm:justify-start">
                    <LevelDots level={tech.level} />
                  </span>
                  <span className="col-span-3 sm:col-span-2 meta text-right sm:text-left text-muted-foreground/70">
                    {LEVEL_LABEL[tech.level]}
                  </span>
                  <span
                    className={`col-span-12 sm:col-span-2 text-xs italic text-muted-foreground transition-opacity ${
                      hovered === tech.name || tech.note
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    {tech.note ?? ''}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
