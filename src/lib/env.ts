import { z } from 'zod'

const envSchema = z.object({
  SESSION_SECRET: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  POSTGRESQL_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
