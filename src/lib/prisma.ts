import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let Prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  Prisma = new PrismaClient({})
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ log: ['query'] })
  }
  Prisma = global.cachedPrisma
}

export const prisma = Prisma
