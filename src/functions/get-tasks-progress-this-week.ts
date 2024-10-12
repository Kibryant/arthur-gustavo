import { prisma } from '@/lib/prisma'

export async function getTasksProgressThisWeek() {
  const today = new Date()
  const firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay()),
  )

  const tasksCreatedThisWeek = await prisma.task.count({
    where: {
      createdAt: {
        gte: firstDayOfWeek,
      },
    },
  })

  const tasksCompletedThisWeek = await prisma.task.count({
    where: {
      status: 'DONE',
      updatedAt: {
        gte: firstDayOfWeek,
      },
    },
  })

  const progressThisWeek =
    tasksCreatedThisWeek > 0
      ? (tasksCompletedThisWeek / tasksCreatedThisWeek) * 100
      : 0

  return { tasksCreatedThisWeek, tasksCompletedThisWeek, progressThisWeek }
}
