import { prisma } from '@/lib/prisma'
import { HttpStatusCode } from '@/types/http-status-code'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json({ posts }, { status: HttpStatusCode.OK })
}
