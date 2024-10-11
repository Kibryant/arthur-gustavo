import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { env } from './env'
import { PrismaNeon } from '@prisma/adapter-neon'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

const neon = new Pool({ connectionString: env.POSTGRESQL_URL })
const adapter = new PrismaNeon(neon)

let Prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  Prisma = new PrismaClient({ adapter })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ log: ['query'], adapter })
  }
  Prisma = global.cachedPrisma
}

export const prisma = Prisma
