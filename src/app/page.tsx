'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Header } from '@/components/header'
import { MobileMenu } from '@/components/mobile-menu'
import { Start } from '@/components/start'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Studies } from '@/components/studies'
import { Footer } from '@/components/footer'
import { Contact } from '@/components/contact'
import { Feedbacks } from '@/components/feedbacks'
import { HelloWorld } from '@/components/hello-world'

const menuItems = ['Inicio', 'Sobre', 'Skills', 'Projeto', 'Contato']

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

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

        <Feedbacks />

        <Studies />

        <HelloWorld />

        <Contact />
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
        <ChevronDown className="transform rotate-180 text-zinc-100" />
      </motion.button>
    </div>
  )
}
