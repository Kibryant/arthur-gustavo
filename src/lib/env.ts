import { z } from 'zod'

const envSchema = z.object({
  SESSION_SECRET: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6),
  GOOGLE_API_KEY: z.string(),
  GOOGLE_AUTH_DOMAIN: z.string(),
  GOOGLE_PROJECT_ID: z.string(),
  GOOGLE_STORAGE_BUCKET: z.string(),
  GOOGLE_MESSAGING_SENDER_ID: z.string(),
  GOOGLE_APP_ID: z.string(),
  GOOGLE_MEASUREMENT_ID: z.string(),
})

export const env = envSchema.parse(process.env)
