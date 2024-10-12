import { prisma } from '@/lib/prisma'

export async function getTasksProgressToday() {
  const today = new Date()

  today.setHours(0, 0, 0, 0)

  const tasksCreatedToday = await prisma.task.count({
    where: {
      createdAt: {
        gte: today,
      },
    },
  })

  const tasksCompletedToday = await prisma.task.count({
    where: {
      status: 'DONE',
      updatedAt: {
        gte: today,
      },
    },
  })

  const progressToday =
    tasksCreatedToday > 0 ? (tasksCompletedToday / tasksCreatedToday) * 100 : 0

  return { tasksCreatedToday, tasksCompletedToday, progressToday }
}
