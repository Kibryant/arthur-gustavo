'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Header } from '@/components/header'
import { MobileMenu } from '@/components/mobile-menu'
import { Start } from '@/components/start'
import { About } from '@/components/about'
import { Currently } from '@/components/currently'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Footer } from '@/components/footer'
import { Contact } from '@/components/contact'

const menuItems = ['Sobre', 'Agora', 'Skills', 'Projeto', 'Contato']

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

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

      <main className="relative">
        <Start />
        <About />
        <Currently />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ y: -2 }}
        className="fixed bottom-6 right-6 size-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg z-40 group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        type="button"
      >
        <ArrowUp className="size-4 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </div>
  )
}
