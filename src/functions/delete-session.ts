'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  revalidatePath('/admin')
  redirect('/admin/sign-in')
}
