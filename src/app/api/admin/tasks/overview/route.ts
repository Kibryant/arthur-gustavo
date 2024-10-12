import { getTasksProgressToday } from '@/functions/get-tasks-progesss-today'
import { getTasksProgressThisWeek } from '@/functions/get-tasks-progress-this-week'
import { getTasksProgressThisMonth } from '@/functions/get-tasks-this-progress-this-month'
import { getTotalTasksCount } from '@/functions/get-total-tasks-count'
import { HttpStatusCode } from '@/types/http-status-code'
import { NextResponse } from 'next/server'

export async function GET() {
  const [todayProgress, weekProgress, monthProgress, totalTasks] =
    await Promise.all([
      getTasksProgressToday(),
      getTasksProgressThisWeek(),
      getTasksProgressThisMonth(),
      getTotalTasksCount(),
    ])

  return NextResponse.json(
    {
      todayProgress,
      weekProgress,
      monthProgress,
      totalTasks,
    },
    { status: HttpStatusCode.OK },
  )
}
