import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import Link from 'next/link'

interface MobileMenuProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  menuItems: string[]
  activeSection: string
  setActiveSection: (section: string) => void
  isLogin?: boolean
}

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-16 bg-background shadow-lg md:hidden z-40 border-b border-blue-500"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-4">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`hover:text-blue-600 transition-colors duration-300 ${
                  activeSection === item.toLowerCase()
                    ? 'text-blue-600 font-semibold'
                    : ''
                }`}
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveSection(item.toLowerCase())
                }}
              >
                {item}
              </a>
            ))}

            <Button className="w-full" asChild>
              <Link href={isLogin ? '/' : '/admin/sign-in'}>
                {isLogin ? 'Sai fora enxerido' : 'Login'}
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
