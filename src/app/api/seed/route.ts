import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import * as argon2 from 'argon2'
import { NextResponse } from 'next/server'

async function seed() {
  const hashedPassword = await argon2.hash(env.ADMIN_PASSWORD)

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
}

export async function GET() {
  await seed()
  return NextResponse.json({ message: 'Seed complete' }, { status: 200 })
}
