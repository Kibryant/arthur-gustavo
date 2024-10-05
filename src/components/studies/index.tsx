import { motion } from 'framer-motion'
import { StudyCard } from '../study-card'

const STUDIES = [
  {
    title: 'React Avançado',
    level: 'Intermediário',
    description: 'Explorando hooks personalizados e performance.',
  },
  {
    title: 'Next.js',
    level: 'Avançado',
    description: 'Construindo aplicações SSR e SSG com React.',
  },
  {
    title: 'Machine Learning',
    level: 'Iniciante',
    description: 'Entendendo os conceitos básicos e algoritmos.',
  },
  {
    title: 'Go Lang para Backend',
    level: 'Intermediário',
    description: 'Construindo APIs escaláveis com Go.',
  },
  {
    title: 'UI/UX Design',
    level: 'Iniciante',
    description: 'Aprendendo princípios de design e experiência do usuário.',
  },
  {
    title: 'Python para Backend',
    level: 'Intermediário',
    description: 'Desenvolvendo APIs RESTful com Django e Flask.',
  },
  {
    title: 'Estudando linguagens baixo nível (C, Zig, Rust)',
    level: 'Iniciante',
    description: 'Explorando linguagens de programação de baixo nível.',
  },
  {
    title: 'Estudando Cloud Computing',
    level: 'Iniciante',
    description: 'Aprendendo conceitos de computação em nuvem.',
  },
]

export function Studies() {
  return (
    <motion.section
      id="estudos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-blue-600">
        O que estou estudando
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STUDIES.map((item, index) => (
          <StudyCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </motion.section>
  )
}
