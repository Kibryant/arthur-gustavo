import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function GET() {
  const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 10)

  await prisma.user.create({
    data: {
      email: env.ADMIN_EMAIL,
      name: 'Arthur Gustavo',
      password: hashedPassword,
      profile: {
        create: {
          bio: 'Software Engineer',
        },
      },
      posts: {
        create: [],
      },
      tasks: {
        create: [],
      },
    },
  })

  return NextResponse.json({ message: 'Seed complete' })
}
