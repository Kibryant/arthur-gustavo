'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Home,
  FileText,
  BarChart2,
  Settings,
  ListTodo,
  ImagePlusIcon,
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
}

export function Sidebar({ activeTab }: SidebarProps) {
  return (
    <aside className="w-20 shadow-md border-r border-r-blue-600">
      <nav className="flex flex-col items-center py-4 space-y-8">
        {[
          { icon: Home, tab: 'overview' },
          { icon: FileText, tab: 'posts' },
          { icon: BarChart2, tab: 'stats' },
          { icon: Settings, tab: 'settings' },
          { icon: ImagePlusIcon, tab: 'create-post' },
          { icon: ListTodo, tab: 'tasks' },
        ].map(({ icon: Icon, tab }) => (
          <Link
            key={tab}
            href={`?${new URLSearchParams({ activeTab: tab }).toString()}`}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Icon
                className={`h-6 w-6 ${activeTab === tab ? 'text-blue-600' : 'text-gray-400'}`}
              />
            </motion.div>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
