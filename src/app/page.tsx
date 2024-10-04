'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Linkedin,
  Mail,
  ChevronDown,
  ExternalLink,
  Code,
  Server,
  Database,
  Phone,
  RocketIcon,
  Code2Icon,
  Briefcase,
  GraduationCap,
} from 'lucide-react'
import { Github } from '@/components/logo/github'
import { InstagramLogoIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModeTheme } from '@/components/mode-theme'

const skills = [
  {
    category: 'Frontend',
    icon: <Code className="w-8 h-8 text-blue-500" />,
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

const projects = [
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

const studys = [
  {
    titulo: 'React Avançado',
    nivel: 'Intermediário',
    descricao: 'Explorando hooks personalizados e performance.',
  },
  {
    titulo: 'Machine Learning',
    nivel: 'Iniciante',
    descricao: 'Entendendo os conceitos básicos e algoritmos.',
  },
  {
    titulo: 'Go Lang para Backend',
    nivel: 'Intermediário',
    descricao: 'Construindo APIs escaláveis com Go.',
  },
  {
    titulo: 'UI/UX Design',
    nivel: 'Iniciante',
    descricao: 'Aprendendo princípios de design e experiência do usuário.',
  },
  {
    titulo: 'Python para Backend',
    nivel: 'Intermediário',
    descricao: 'Desenvolvendo APIs RESTful com Django e Flask.',
  },
  {
    titulo: 'Estudando linguagens baixo nível (C, Zig, Rust)',
    nivel: 'Iniciante',
    descricao: 'Explorando linguagens de programação de baixo nível.',
  },
]

const menuItems = ['Inicio', 'Sobre', 'Skills', 'Projeto', 'Contato']

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
})

type ContactSchema = z.infer<typeof contactSchema>

const sendEmail = async (formData: ContactSchema) => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Erro ao enviar a mensagem')
  }

  return response.json()
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('Frontend')
  const [hoveredSkill, setHoveredSkill] = useState<null | string>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) =>
        item.toLowerCase().replace(' ', '-'),
      )
      console.log(sections)
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange', // Validação em tempo real
  })

  const mutation = useMutation({
    mutationFn: sendEmail,
    mutationKey: ['send-email'],
    onSuccess: () => {
      alert('Mensagem enviada com sucesso!')
    },
    onError: () => {
      alert('Erro ao enviar a mensagem.')
    },
  })

  const onSubmit = (data: ContactSchema) => {
    mutation.mutate(data)
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 shadow-md z-50 border-b border-blue-500 backdrop-blur">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-blue-600"
          >
            <RocketIcon size={28} className="inline-block mr-2" />
            Arthur Gustavo
          </motion.h1>
          <div className="hidden md:flex space-x-6 items-center">
            <ModeTheme />
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`hover:text-blue-600 transition-colors duration-300 ${
                  activeSection === item.toLowerCase()
                    ? 'text-blue-600 font-semibold'
                    : ''
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <button
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            type="button"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-white shadow-lg md:hidden z-40"
          >
            <nav className="container mx-auto py-4">
              {menuItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 px-4 hover:bg-zinc-100 hover:text-blue-600 transition-colors duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600 font-semibold'
                      : ''
                  }`}
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    setIsMenuOpen(false)
                    setActiveSection(item.toLowerCase())
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <section
          id="inicio"
          className="min-h-screen flex flex-col justify-center items-center text-center"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <motion.div
              className="absolute top-0 left-0 w-80 h-80 bg-blue-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
              animate={{ x: [0, 300, -300], y: [0, -200, 200] }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"
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
            Olá, eu sou <span className="text-blue-600">Arthur Gustavo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl"
          >
            Desenvolvedor Fullstack apaixonado por criar soluções inovadoras e
            escaláveis
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
              <Github className="size-6" />
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

        <motion.section
          id="sobre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Sobre Mim
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <Avatar className="w-32 h-32 md:w-52 md:h-52">
                <AvatarImage src="https://github.com/Kibryant.png" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-lg mb-4">
                Olá! Sou um desenvolvedor fullstack com mais de 3 anos de
                experiência na criação de aplicações web e mobile inovadoras.
                Minha paixão está em resolver problemas complexos e transformar
                ideias em produtos digitais de alta qualidade.
              </p>
              <p className="text-lg mb-6">
                Com um forte background em tecnologias frontend e backend, estou
                sempre em busca de novos desafios e oportunidades para aprender
                e crescer na minha carreira.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
                  <span>3+ anos de experiência</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
                  <span>Estudante de administração pela UESC</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RocketIcon className="w-6 h-6 text-blue-600 mr-2" />
                  <span>Entusiasta de tecnologia e inovação</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code2Icon className="w-6 h-6 text-blue-600 mr-2" />
                  <span>Desenvolvedor Fullstack</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Minhas Habilidades
          </h2>
          <div className="mb-8 flex justify-center space-x-4">
            {skills.map((category) => (
              <motion.button
                key={category.category}
                className={`px-4 py-2 rounded-full ${
                  selectedSkillCategory === category.category
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-400'
                    : 'border dark:border-zinc-300'
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
              className="grid md:grid-cols-2 gap-8"
            >
              {skills
                .find((category) => category.category === selectedSkillCategory)
                ?.technologies.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden dark:bg-background dark:border dark:border-zinc-300"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                    <div className="w-full bg-zinc-200 rounded-full h-2.5 mb-4">
                      <motion.div
                        className="bg-blue-600 h-2.5 rounded-full"
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
                          className="absolute inset-0 bg-blue-600 bg-opacity-90 p-6 flex items-center justify-center text-center"
                        >
                          <p>{skill.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        <motion.section
          id="projeto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Projetos em Destaque
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-100 p-6 rounded-lg shadow-md dark:bg-background dark:border dark:border-zinc-300"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-200 px-2 py-1 rounded-full text-sm dark:bg-background dark:text-zinc-300 dark:border dark:border-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center"
                >
                  Ver Projeto <ExternalLink size={16} className="ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="estudos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            O que estou estudando
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studys.map((item, index) => (
              <motion.div
                key={item.titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-100 p-6 rounded-lg shadow-md dark:bg-background dark:border dark:border-zinc-300"
              >
                <h3 className="text-xl font-semibold mb-2">{item.titulo}</h3>
                <p className="text-zinc-500 text-sm mb-2">{item.nivel}</p>
                <p className="mb-4">{item.descricao}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contato"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Contato
          </h2>

          <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {/* Nome */}
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600
                  ${errors.name ? 'border-red-500 focus:ring-red-600' : 'border-zinc-300'}`}
                {...register('name')}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600
                  ${errors.email ? 'border-red-500 focus:ring-red-600' : 'border-zinc-300'}`}
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Mensagem */}
            <div className="mb-4">
              <label htmlFor="message" className="block font-semibold mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600
                  ${errors.message ? 'border-red-500 focus:ring-red-600' : 'border-zinc-300'}`}
                {...register('message')}
              />
              {errors.message && (
                <span className="text-red-500 text-sm">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Botão de Envio */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              type="submit"
              disabled={!isValid || isSubmitting || mutation.isPending}
            >
              {mutation.isPending || isSubmitting
                ? 'Enviando...'
                : 'Enviar Mensagem'}
            </motion.button>
          </form>
        </motion.section>
      </main>

      <footer className="bg-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Arthur Gustavo. Todos os direitos reservados.</p>
        </div>
      </footer>

      <motion.button
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
      >
        <ChevronDown className="transform rotate-180" />
      </motion.button>
    </div>
  )
}
