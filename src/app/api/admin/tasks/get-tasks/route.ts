import { getSession } from '@/functions/get-session'
import { decrypt } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import { HttpStatusCode } from '@/types/http-status-code'
import { NextResponse } from 'next/server'

export async function GET() {
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

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(
    { message: 'Get all tasks completed', tasks },
    { status: HttpStatusCode.OK },
  )
}
