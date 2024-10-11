import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import { Priority, Status } from '@prisma/client'

async function seed() {
  const admin = await prisma.user.findUnique({
    where: {
      email: env.ADMIN_EMAIL,
    },
  })

  await prisma.task.createMany({
    data: [
      {
        title: 'Task 1',
        tag: 'Tag 1',
        userId: admin.id!,
        priority: Priority.MEDIUM,
      },
      {
        title: 'Task 2',
        tag: 'Tag 2',
        userId: admin.id!,
        priority: Priority.HIGH,
        status: Status.IN_PROGRESS,
      },
      {
        title: 'Task 3',
        tag: 'Tag 3',
        userId: admin.id!,
        priority: Priority.LOW,
        status: Status.DONE,
      },
      {
        title: 'Task 4',
        tag: 'Tag 4',
        userId: admin.id!,
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
      },
    ],
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
