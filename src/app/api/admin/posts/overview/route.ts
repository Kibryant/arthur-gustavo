import { getPostsCountThisMonth } from '@/functions/get-posts-count-this-month'
import { getPostsCountThisWeek } from '@/functions/get-posts-count-this-week'
import { getPostsCountToday } from '@/functions/get-posts-count-today'
import { getSession } from '@/functions/get-session'
import { getTotalPostsCount } from '@/functions/get-total-posts-count'
import { decrypt } from '@/lib/jwt'
import { HttpStatusCode } from '@/types/http-status-code'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const payload = await decrypt(session)

  if (!payload) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: HttpStatusCode.Unauthorized },
    )
  }

  const [todayCount, weekCount, monthCount, totalCount] = await Promise.all([
    getPostsCountToday(),
    getPostsCountThisWeek(),
    getPostsCountThisMonth(),
    getTotalPostsCount(),
  ])

  return NextResponse.json(
    {
      todayCount,
      weekCount,
      monthCount,
      totalCount,
    },
    {
      status: HttpStatusCode.OK,
    },
  )
}
