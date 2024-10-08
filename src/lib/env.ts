import { z } from 'zod'

const envSchema = z.object({
  SESSION_SECRET: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6),
})

export const env = envSchema.parse(process.env)
