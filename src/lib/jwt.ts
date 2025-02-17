import 'server-only'
import { type JWTPayload, SignJWT, jwtVerify } from 'jose'

export interface SessionPayload extends JWTPayload {
  userId: string
  expiresAt: Date
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(
  session: string | undefined,
): Promise<SessionPayload | undefined> {
    if (!session) {
        return
    }
    
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })

    return payload as SessionPayload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
