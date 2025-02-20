import { getSession } from '@/functions/get-session'
import { decrypt } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import { HttpStatusCode } from '@/types/http-status-code'
import { type NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
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
    
    const userId = payload.userId
    
    const { id } = await req.json()
    
    const post = await prisma.post.findUnique({
        where: {
        id,
        },
    })
    
    if (!post) {
        return NextResponse.json(
        { message: 'Post not found' },
        { status: HttpStatusCode.NotFound },
        )
    }
    
    if (post.userId !== userId) {
        return NextResponse.json(
        { message: 'Unauthorized' },
        { status: HttpStatusCode.Unauthorized },
        )
    }
    
    await prisma.post.delete({
        where: {
        id,
        },
    })
    
    return NextResponse.json(
        { message: 'Post deleted' },
        { status: HttpStatusCode.OK },
    )
    }