'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Code, Database, Phone, Server } from 'lucide-react'
import { useState } from 'react'

const SKILLS = [
  {
    category: 'Frontend',
    icon: <Code className="w-8 h-8 text-primary" />,
    technologies: [
      {
        name: 'JavaScript',
        level: 90,
        description:
          'Experiência avançada em ES6+, manipulação do DOM e APIs modernas.',
      },
      {
        name: 'TypeScript',
        level: 85,
        description:
          'Forte conhecimento em tipagem estática e recursos avançados.',
      },
      {
        name: 'React',
        level: 88,
        description:
          'Proficiente em hooks, context API, e otimização de performance.',
      },
      {
        name: 'Vue.js',
        level: 50,
        description: 'Experiência em desenvolvimento de aplicações SPA e SSR.',
      },
      {
        name: 'HTML5/CSS3',
        level: 92,
        description:
          'Domínio em semântica, acessibilidade e design responsivo.',
      },
      {
        name: 'Tailwind CSS',
        level: 97,
        description:
          'Construção de interfaces modernas e design system com utility-first.',
      },
      {
        name: 'Figma',
        level: 70,
        description:
          'Design de interfaces, prototipagem e colaboração com desenvolvedores.',
      },
    ],
  },
  {
    category: 'Backend',
    icon: <Server className="w-8 h-8 text-green-500" />,
    technologies: [
      {
        name: 'Node.js',
        level: 82,
        description:
          'Criação de APIs RESTful, autenticação e integração com bancos de dados.',
      },
      {
        name: 'Go',
        level: 75,
        description:
          'Desenvolvimento de microserviços e aplicações de alta performance.',
      },
      {
        name: 'Python',
        level: 80,
        description: 'Experiência em Django, Flask e automação de tarefas.',
      },
      {
        name: 'Java',
        level: 78,
        description:
          'Desenvolvimento de aplicações empresariais com Spring Boot.',
      },
    ],
  },
  {
    category: 'Banco de Dados',
    icon: <Database className="w-8 h-8 text-purple-500" />,
    technologies: [
      {
        name: 'MongoDB',
        level: 85,
        description: 'Modelagem de dados, queries avançadas e otimização.',
      },
      {
        name: 'PostgreSQL',
        level: 80,
        description:
          'Design de esquemas, stored procedures e otimização de consultas.',
      },
      {
        name: 'Redis',
        level: 75,
        description:
          'Caching, filas de mensagens e estruturas de dados avançadas.',
      },
    ],
  },
  {
    category: 'Mobile',
    icon: <Phone className="w-8 h-8 text-yellow-500" />,
    technologies: [
      {
        name: 'React Native',
        level: 82,
        description:
          'Desenvolvimento de aplicativos multiplataforma para iOS e Android.',
      },
      {
        name: 'Expo',
        level: 80,
        description:
          'Configuração de projetos, APIs nativas e publicação de apps.',
      },
    ],
  },
]

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<null | string>(null)
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('Frontend')

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-primary">
        Minhas Habilidades
      </h2>
      <div className="mb-10 flex flex-wrap justify-center gap-4">
        {SKILLS.map((category) => (
          <motion.button
            key={category.category}
            className={`px-4 py-2 text-sm md:text-base rounded-full font-medium ${
              selectedSkillCategory === category.category
                ? 'bg-gradient-to-tr from-primary to-blue-400 text-zinc-100'
                : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
            } transition-colors duration-300`}
            onClick={() => setSelectedSkillCategory(category.category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.category}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSkillCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          {SKILLS.find(
            (category) => category.category === selectedSkillCategory,
          )?.technologies.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 dark:bg-transparent rounded-lg shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-700"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                {skill.name}
              </h3>
              <div className="w-full bg-zinc-200 dark:bg-zinc-600 rounded-full h-2.5 mb-4">
                <motion.div
                  className="bg-primary h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
              <AnimatePresence>
                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary bg-opacity-90 p-6 flex items-center justify-center text-center text-zinc-100 rounded-lg"
                  >
                    <p className="text-md">{skill.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  )
}
