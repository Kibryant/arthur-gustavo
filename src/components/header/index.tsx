'use client'

import { motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { ModeTheme } from '../mode-theme'
import { useEffect, useState } from 'react'
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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')

const formatBrtNow = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Bahia',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())

export function Header({
  menuItems,
  activeSection,
  setActiveSection,
  isMenuOpen,
  setIsMenuOpen,
  isLogin,
}: HeaderProps) {
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const [now, setNow] = useState<string>(() => formatBrtNow())

  useEffect(() => {
    const id = window.setInterval(() => setNow(formatBrtNow()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(slugify)
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-rule">
      {/* metadata strip */}
      <div className="hidden md:flex justify-between items-center px-6 lg:px-10 py-1.5 border-b border-rule/60">
        <div className="meta flex items-center gap-4">
          <span>est · 2019</span>
          <span className="opacity-40">/</span>
          <span>itabuna · ba · br</span>
        </div>
        <div className="meta flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-live live-dot" />
            available for new work
          </span>
          <span className="opacity-40">/</span>
          <span className="font-variant-numeric tabular-nums">
            {now ? `${now} brt` : '··:·· brt'}
          </span>
        </div>
      </div>

      <nav className="container mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-display italic text-2xl text-foreground transition-colors group-hover:text-primary">
            Arthur
          </span>
          <span className="meta hidden sm:inline">/ engineer</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {menuItems.map((item, idx) => {
            const slug = slugify(item)
            const active = activeSection === slug
            return (
              <motion.a
                key={item}
                href={`#${slug}`}
                className="meta-strong relative flex items-baseline gap-1.5 hover:text-primary transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-muted-foreground/60 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={active ? 'text-primary' : ''}>{item}</span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary"
                  />
                )}
              </motion.a>
            )
          })}
          <div className="h-4 w-px bg-rule" />
          <ModeTheme />
        </div>

        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          type="button"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  )
}
