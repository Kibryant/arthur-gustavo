import { prisma } from '@/lib/prisma'

export async function getPostsCountThisMonth() {
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const postsCountThisMonth = await prisma.post.count({
    where: {
      createdAt: {
        gte: firstDayOfMonth,
      },
    },
  })

  return postsCountThisMonth
}
