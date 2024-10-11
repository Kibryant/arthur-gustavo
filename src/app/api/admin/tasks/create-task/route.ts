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

  const { title, tag, status, priority } = await req.json()

  const task = await prisma.task.create({
    data: {
      title,
      tag,
      userId,
      priority,
      status,
    },
  })

  return NextResponse.json(
    { message: 'Task created', task },
    { status: HttpStatusCode.OK },
  )
}
