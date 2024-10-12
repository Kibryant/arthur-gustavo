import { prisma } from '@/lib/prisma'

export async function getTotalTasksCount() {
  const totalTasks = await prisma.task.count()
  return totalTasks
}
