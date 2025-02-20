import { type NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/jwt'
import { getSession } from './functions/get-session'

const protectedRoutes = ['/admin']
const publicRoutes = ['/admin/sign-in']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = await getSession()
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/admin/sign-in', req.nextUrl))
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(
      new URL('/admin?activeTab=overview', req.nextUrl),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
