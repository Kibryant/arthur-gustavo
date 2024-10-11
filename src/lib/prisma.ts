import { PrismaClient } from '@prisma/client/extension'
import { Pool } from '@neondatabase/serverless'
import { env } from './env'
import { PrismaNeon } from '@prisma/adapter-neon'

export const runtime = 'edge'

const neon = new Pool({ connectionString: env.POSTGRESQL_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({ adapter })

export { prisma }
