import { prisma } from '@/lib/prisma'

export async function getPostsCountThisWeek() {
  const today = new Date()
  const firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay()),
  )

  const postsCountThisWeek = await prisma.post.count({
    where: {
      createdAt: {
        gte: firstDayOfWeek,
      },
    },
  })

  return postsCountThisWeek
}
