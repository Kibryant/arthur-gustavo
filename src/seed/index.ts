import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import * as argon2 from 'argon2'

async function seed() {
  const hashedPassword = await argon2.hash(env.ADMIN_PASSWORD)

  await prisma.user.create({
    data: {
      name: 'Arthur Gustavo',
      email: env.ADMIN_EMAIL,
      password: hashedPassword,
      profile: {
        create: {
          bio: 'Software Engineer',
        },
      },
      posts: {
        create: [],
      },
    },
  })
}

seed()
  .then(() => {
    console.log('Seed complete')
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
