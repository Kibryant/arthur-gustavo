import { motion } from 'framer-motion'
import { RocketIcon } from 'lucide-react'

export function Logo() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-xl font-bold text-blue-600"
    >
      <RocketIcon size={28} className="inline-block mr-2" />
      Arthur Gustavo
    </motion.h1>
  )
}
