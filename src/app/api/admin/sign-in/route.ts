import { createSession } from '@/functions/create-session'
import { prisma } from '@/lib/prisma'
import { HttpStatusCode } from '@/types/http-status-code'
import { type NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const admin = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!admin) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: HttpStatusCode.NotFound },
    )
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password)

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: 'Invalid password' },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  await createSession(admin.id)

  return NextResponse.json(
    { message: 'Logged in' },
    { status: HttpStatusCode.OK },
  )
}
