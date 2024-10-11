import { getSession } from '@/functions/get-session'
import { decrypt } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import { HttpStatusCode } from '@/types/http-status-code'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const payload = await decrypt(session)

  if (!payload) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const userId = payload.userId

  const { title, caption, tags, category, imageUrl } = await req.json()

  const post = await prisma.post.create({
    data: {
      title,
      caption,
      tags,
      category,
      imageUrl,
      userId,
    },
  })

  return NextResponse.json(
    { message: 'Post created', post },
    { status: HttpStatusCode.OK },
  )
}
