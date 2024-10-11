'use client'

import { motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { ModeTheme } from '../mode-theme'
import { useEffect } from 'react'
import { Logo } from '../logo'
import Link from 'next/link'
import { Button } from '../ui/button'

interface HeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  menuItems: string[]
  activeSection: string
  setActiveSection: (section: string) => void
  isLogin?: boolean
}

export function Header({
  menuItems,
  activeSection,
  setActiveSection,
  isMenuOpen,
  setIsMenuOpen,
  isLogin,
}: HeaderProps) {
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) =>
        item.toLowerCase().replace(' ', '-'),
      )
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
  }, [menuItems, setActiveSection])

  return (
    <header className="fixed top-0 left-0 right-0 shadow-md z-50 border-b border-blue-500 backdrop-blur">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
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
          <Link
            href="/blog"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Blog
          </Link>
          <Button className="hidden md:block" asChild>
            <Link href={isLogin ? '/' : '/admin/sign-in'}>
              {isLogin ? 'Sai fora enxerido' : 'Login'}
            </Link>
          </Button>
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
  )
}
