import { motion } from 'framer-motion'
import { Code2Icon, Github, Linkedin, Mail } from 'lucide-react'
import { Badge } from '../ui/badge'
import { InstagramLogoIcon } from '@radix-ui/react-icons'
import { TextEffect } from '../text-effect'

export function Start() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-visible"
    >
      <div className="absolute inset-0 w-full h-full overflow-visible z-0">
        <motion.div
          className="absolute top-0 left-0 w-80 h-80 bg-blue-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
          animate={{ x: [0, 300, -300], y: [0, -200, 200] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-2 right-0 w-80 h-80 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
          animate={{ x: [0, -300, 300], y: [0, 200, -200] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
      <Badge variant="outline">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Code2Icon className="size-6 mr-2 inline-block text-blue-600" />
          Desenvolvedor Fullstack
        </motion.span>
      </Badge>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-6"
      >
        Olá, eu sou{' '}
        <TextEffect per="char" className="text-blue-600" delay={0.1}>
          Arthur Gustavo
        </TextEffect>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl md:text-2xl mb-8 max-w-2xl"
      >
        Desenvolvedor Fullstack apaixonado por criar soluções inovadoras, com
        foco em qualidade e performance.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex space-x-4"
      >
        <a
          href="https://github.com/Kibryant"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors duration-300"
          aria-label="GitHub Profile"
        >
          <Github className="size-6 dark:fill-zinc-100" />
        </a>
        <a
          href="https://linkedin.com/in/arthur-nascimento-714634261"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors duration-300"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="mailto:arthurgustavon@gmail.com"
          className="hover:text-blue-600 transition-colors duration-300"
          aria-label="Email Contact"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://instagram.com/arthurgustavk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors duration-300"
          aria-label="Email Contact"
        >
          <InstagramLogoIcon className="size-6" />
        </a>
      </motion.div>
    </section>
  )
}
