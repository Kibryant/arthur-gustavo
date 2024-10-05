import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, RocketIcon, Code2Icon } from 'lucide-react'

const ITEMS = [
  {
    icon: <Briefcase className="w-6 h-6 text-blue-600 mr-3" />,
    text: '3+ anos de experiência',
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />,
    text: 'Estudante de Administração pela UESC',
  },
  {
    icon: <RocketIcon className="w-6 h-6 text-blue-600 mr-3" />,
    text: 'Entusiasta de tecnologia e inovação',
  },
  {
    icon: <Code2Icon className="w-6 h-6 text-blue-600 mr-3" />,
    text: 'Desenvolvedor Fullstack',
  },
]

export function About() {
  return (
    <motion.section
      id="sobre"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-blue-600">
        Sobre Mim
      </h2>
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <Avatar className="w-40 h-40 md:w-60 md:h-60 shadow-lg rounded-full overflow-hidden border-4 border-blue-300">
            <AvatarImage src="https://github.com/Kibryant.png" />
            <AvatarFallback className="bg-blue-600 text-white text-4xl font-semibold">
              AG
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-left space-y-6"
        >
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-zinc-300">
            Olá! Sou um desenvolvedor fullstack com mais de{' '}
            <strong className="text-blue-600">3 anos</strong> de experiência na
            criação de aplicações web e mobile inovadoras. Tenho paixão por
            resolver problemas complexos e transformar ideias em produtos
            digitais de alta qualidade.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-zinc-300">
            Com um background sólido em tecnologias frontend e backend, estou
            sempre buscando novos desafios e oportunidades para crescer e
            aprender continuamente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {ITEMS.map((item, index) => (
              <motion.div
                key={`about-item-${index + 1}`}
                className="flex items-center p-4 shadow-lg rounded-lg bg-white dark:bg-transparent border border-gray-200 dark:border-zinc-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="text-md font-medium text-gray-900 dark:text-zinc-200">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
