'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Home,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  CreativeCommons,
} from 'lucide-react'
import { StatsTab } from '@/components/stats-tab'
import { ModeTheme } from '@/components/mode-theme'
import { OverviewTab } from '@/components/overview-tab'
import { PostsTab } from '@/components/posts-tab'
import { SettingsTab } from '@/components/settings-tab'
import { CreatePostTab } from '@/components/create-post-tab'

const isAuthenticated = true
const adminName = 'John Doe'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen">
      <aside className="w-20 shadow-md border-r border-r-blue-600">
        <nav className="flex flex-col items-center py-4 space-y-8">
          <Link href="#" onClick={() => setActiveTab('overview')}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Home
                className={`h-6 w-6 ${activeTab === 'overview' ? 'text-blue-600' : 'text-gray-400'}`}
              />
            </motion.div>
          </Link>
          <Link href="#" onClick={() => setActiveTab('posts')}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FileText
                className={`h-6 w-6 ${activeTab === 'posts' ? 'text-blue-600' : 'text-gray-400'}`}
              />
            </motion.div>
          </Link>
          <Link href="#" onClick={() => setActiveTab('stats')}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <BarChart2
                className={`h-6 w-6 ${activeTab === 'stats' ? 'text-blue-600' : 'text-gray-400'}`}
              />
            </motion.div>
          </Link>
          <Link href="#" onClick={() => setActiveTab('settings')}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Settings
                className={`h-6 w-6 ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'}`}
              />
            </motion.div>
          </Link>
          <Link href="#" onClick={() => setActiveTab('create-post')}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <CreativeCommons
                className={`h-6 w-6 ${activeTab === 'create-post' ? 'text-blue-600' : 'text-gray-400'}`}
              />
            </motion.div>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="shadow-sm z-10 border-b border-b-blue-600">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ModeTheme />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt={adminName} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'posts' && <PostsTab />}
                {activeTab === 'stats' && <StatsTab />}
                {activeTab === 'settings' && <SettingsTab />}
                {activeTab === 'create-post' && <CreatePostTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
