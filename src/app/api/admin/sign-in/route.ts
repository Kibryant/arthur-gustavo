import { createSession } from '@/functions/create-session'
import { HttpStatusCode } from '@/types/http-status-code'
import { type NextRequest, NextResponse } from 'next/server'
import * as argon2 from 'argon2'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
import { env } from '@/lib/env'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const neon = new Pool({ connectionString: env.POSTGRESQL_URL })
  const adapter = new PrismaNeon(neon)
  const prisma = new PrismaClient({ adapter })

  const { email, password } = await req.json()

  const admin = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!admin) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const isPasswordValid = await argon2.verify(admin.password, password)

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
  }

  await createSession(admin.id)

  return NextResponse.json(
    { message: 'Logged in' },
    { status: HttpStatusCode.OK },
  )
}
