import 'server-only'

import { cookies } from 'next/headers'
import { encrypt } from '@/lib/jwt'

export async function createSession(userId: string) {
  const expiresInSevenDaysFromNow = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  )

  const session = await encrypt({
    userId,
    expiresAt: expiresInSevenDaysFromNow,
  })

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresInSevenDaysFromNow,
    sameSite: 'lax',
    path: '/',
  })
}
