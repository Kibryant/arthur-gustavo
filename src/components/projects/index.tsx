import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Premium Trainer',
    description:
      'Landing Page para cliente personal trainer, construída com Nextjs e Tailwind CSS.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    link: 'https://github.com/leafartech/premium_trainer',
  },
  {
    title: 'Combo FR',
    description:
      'Landing Page para clientes (Nutricionista e Personal Trainer), construída com Nextjs e Tailwind CSS.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    link: 'https://github.com/leafartech/facilitadorderesultados',
  },
  {
    title: 'App Dna Mecha Turbo Frontend',
    description:
      'Aplicativo mobile (Ios & Android) para cabeleireira, desenvolvido com React Native e Expo.',
    tags: ['React Native', 'Expo', 'API Integration'],
    link: 'https://github.com/Kibryant/mecha-turbo-frontend',
  },
  {
    title: 'App Dna Mecha Turbo Backend',
    description:
      'API RESTful para aplicativo mobile, desenvolvida com Node.js e MongoDB.',
    tags: [
      'Node.js',
      'Express',
      'MongoDB',
      'REST API',
      'JWT',
      'TypeScript',
      'Zod',
      'React-Hook-Form',
    ],
    link: 'https://github.com/Kibryant/mecha-turbo-backend',
  },
  {
    title: 'App Planner Mecha Turbo',
    description:
      'Aplicativo mobile (Ios & Android), desenvolvido com React Native e Expo.',
    tags: [
      'React Native',
      'Expo',
      'API Integration',
      'TypeScript',
      'Zustand',
      'Nativewind',
      'Tanstack',
    ],
    link: 'https://github.com/Kibryant/planner-frontend',
  },
  {
    title: 'App Planner Mecha Turbo Backend',
    description:
      'API RESTful para aplicativo mobile, desenvolvida com Node.js e MongoDB.',
    tags: [
      'Node.js',
      'Fastify',
      'Postgres',
      'REST API',
      'JWT',
      'TypeScript',
      'Zod',
      'Prisma',
    ],
    link: 'https://github.com/Kibryant/planner-backend',
  },
]

export function Projects() {
  return (
    <motion.section
      id="projeto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-blue-600">
        Projetos em Destaque
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:border dark:border-zinc-700"
          >
            <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
              {project.title}
            </h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-colors duration-300 flex items-center font-medium"
            >
              Ver Projeto <ExternalLink size={16} className="ml-1" />
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
