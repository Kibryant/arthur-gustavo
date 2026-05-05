'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ModeTheme } from '../mode-theme'

interface MobileMenuProps {
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

export function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  menuItems,
  activeSection,
  setActiveSection,
  isLogin,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 top-16 bg-background border-b border-rule shadow-xl md:hidden z-40"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
            {menuItems.map((item, idx) => {
              const slug = slugify(item)
              const active = activeSection === slug
              return (
                <a
                  key={item}
                  href={`#${slug}`}
                  className="flex items-baseline gap-3 py-3 border-b border-rule group"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setActiveSection(slug)
                  }}
                >
                  <span className="meta tabular-nums text-muted-foreground/60 w-6">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-2xl tracking-tight ${active ? 'italic text-primary' : 'group-hover:italic'}`}
                  >
                    {item}
                  </span>
                  <span className="ml-auto text-primary opacity-30 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
              )
            })}
            <div className="flex items-center justify-between pt-5">
              <ModeTheme />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
