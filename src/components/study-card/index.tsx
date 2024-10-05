import { motion } from 'framer-motion'

interface StudyItem {
  title: string
  level: string
  description: string
}

interface StudyCardProps {
  item: StudyItem
  index: number
}

const getNivelColor = (nivel: string) => {
  switch (nivel.toLowerCase()) {
    case 'iniciante':
      return 'text-green-500 dark:text-green-400'
    case 'intermediário':
      return 'text-yellow-500 dark:text-yellow-400'
    case 'avançado':
      return 'text-red-500 dark:text-red-400'
    default:
      return 'text-zinc-600 dark:text-zinc-400'
  }
}

export function StudyCard({ item, index }: StudyCardProps) {
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-lg shadow-lg border border-zinc-200 dark:bg-transparent dark:border-zinc-700"
    >
      <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
        {item.title}
      </h3>
      <p className={`text-sm mb-2 ${getNivelColor(item.level)}`}>
        {item.level}
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">{item.description}</p>
    </motion.div>
  )
}
