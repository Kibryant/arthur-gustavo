import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  menuItems: string[]
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  menuItems,
  activeSection,
  setActiveSection,
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
