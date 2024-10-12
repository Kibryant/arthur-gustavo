import { prisma } from '@/lib/prisma'

export async function getTotalPostsCount() {
  const totalPosts = await prisma.post.count()
  return totalPosts
}
