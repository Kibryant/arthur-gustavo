'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Header } from '@/components/header'
import { MobileMenu } from '@/components/mobile-menu'
import { Start } from '@/components/start'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Studies } from '@/components/studies'
import { Footer } from '@/components/footer'

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
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
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <Start />

        <About />

        <Skills />

        <Projects />

        <Studies />

        <motion.section
          id="contato"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-blue-600">
            Entre em Contato
          </h2>

          <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
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

      <Footer />

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
