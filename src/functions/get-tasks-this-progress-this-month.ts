import { prisma } from '@/lib/prisma'

export async function getTasksProgressThisMonth() {
  const today = new Date()

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const tasksCreatedThisMonth = await prisma.task.count({
    where: {
      createdAt: {
        gte: firstDayOfMonth,
      },
    },
  })

  const tasksCompletedThisMonth = await prisma.task.count({
    where: {
      status: 'DONE',
      updatedAt: {
        gte: firstDayOfMonth,
      },
    },
  })

  const progressThisMonth =
    tasksCreatedThisMonth > 0
      ? (tasksCompletedThisMonth / tasksCreatedThisMonth) * 100
      : 0

  return { tasksCreatedThisMonth, tasksCompletedThisMonth, progressThisMonth }
}
