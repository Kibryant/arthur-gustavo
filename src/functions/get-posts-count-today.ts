import { prisma } from '@/lib/prisma'

export async function getPostsCountToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const postsCountToday = await prisma.post.count({
    where: {
      createdAt: {
        gte: today,
      },
    },
  })

  return postsCountToday
}
