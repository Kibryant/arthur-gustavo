import nodemailer from 'nodemailer'

import { NextResponse } from 'next/server'
import { HttpStatusCode } from '@/types/http-status-code'

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: message,
    })
    return NextResponse.json(
      { message: 'Email sent' },
      { status: HttpStatusCode.OK },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: HttpStatusCode.InternalServerError },
    )
  }
}
