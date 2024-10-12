'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings, LogOut, Bell } from 'lucide-react'
import { ModeTheme } from '@/components/mode-theme'
import { Tab } from '@/components/tab'
import { Sidebar } from '@/components/sidebar'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { logout } from '@/functions/logout'
import Link from 'next/link'

const ADMIN_NAME = 'Arthur Gustavo'

interface AdminDashboardProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

type TabType =
  | 'overview'
  | 'posts'
  | 'stats'
  | 'settings'
  | 'create-post'
  | 'tasks'

export default function AdminDashboard({ searchParams }: AdminDashboardProps) {
  const activeTab = searchParams.activeTab as TabType

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="shadow-sm z-10 border-b border-b-primary">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Olá, {ADMIN_NAME}!</h1>
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
                      <AvatarImage
                        src="https://github.com/Kibryant.png"
                        alt={ADMIN_NAME}
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ChevronLeftIcon className="mr-2 h-4 w-4" />
                    <Link href="/">Voltar para o site</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Tab activeTab={activeTab} />
          </div>
        </main>
      </div>
    </div>
  )
}
