'use client'

import { FileText, BarChart2, Home, Settings, CheckSquare } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { BASE_URL } from '@/constants/base-url'
import { useQuery } from '@tanstack/react-query'
import { Progress } from '../ui/progress'

interface PostOverviewResponse {
  todayCount: number
  weekCount: number
  monthCount: number
  totalCount: number
}

interface TaskOverviewResponse {
  todayProgress: {
    tasksCreatedToday: number
    tasksCompletedToday: number
    progressToday: number
  }
  weekProgress: {
    tasksCreatedThisWeek: number
    tasksCompletedThisWeek: number
    progressThisWeek: number
  }
  monthProgress: {
    tasksCreatedThisMonth: number
    tasksCompletedThisMonth: number
    progressThisMonth: number
  }
  totalTasks: number
}

export function OverviewTab() {
  const { data: postData } = useQuery<PostOverviewResponse>({
    queryKey: ['post-overview'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/admin/posts/overview`)
      return (await response.json()) as PostOverviewResponse
    },
  })

  const { data: taskData } = useQuery<TaskOverviewResponse>({
    queryKey: ['task-overview'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/admin/tasks/overview`)
      return (await response.json()) as TaskOverviewResponse
    },
  })

  console.log(taskData)

  return (
    <>
      <h1 className="text-3xl font-bold">Seja bem-vindo!</h1>
      <p className="text-muted-foreground mb-6">
        Aqui você pode ver um resumo das suas atividades recentes.
      </p>

      {/* Posts Overview Section */}
      <h2 className="text-2xl font-semibold mb-4">Posts Overview</h2>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {postData?.totalCount?.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{postData?.monthCount?.toLocaleString()} este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts Hoje</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {postData?.todayCount?.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{postData?.weekCount?.toLocaleString()} esta semana
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Posts semanais
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {postData?.weekCount?.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{postData?.todayCount?.toLocaleString()} hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Actions
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Last post edited: 2h ago</div>
            <p className="text-xs text-muted-foreground">
              "10 Tips for Better SEO"
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Tasks Overview</h2>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Tasks
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {taskData?.totalTasks?.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{taskData?.monthProgress.tasksCreatedThisMonth?.toLocaleString()}{' '}
              criadas este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Hoje</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {taskData?.todayProgress.tasksCreatedToday?.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {taskData?.todayProgress.tasksCompletedToday?.toLocaleString()}{' '}
              completadas hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Semanais
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {taskData?.weekProgress.tasksCreatedThisWeek?.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {taskData?.weekProgress.tasksCompletedThisWeek?.toLocaleString()}{' '}
              completadas esta semana
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Progresso Mensal
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {taskData?.monthProgress.progressThisMonth?.toFixed(2)}%
            </div>
            <Progress value={taskData?.monthProgress.progressThisMonth} />
            <p className="text-xs text-muted-foreground mt-2">
              {taskData?.monthProgress.tasksCompletedThisMonth?.toLocaleString()}{' '}
              completadas este mês
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
