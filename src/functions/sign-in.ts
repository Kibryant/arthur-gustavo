import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type SignInSchema = z.infer<typeof signInSchema>

export async function signIn(data: SignInSchema) {
  const response = await fetch('/api/admin/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    return {
      success: false,
      error: 'Erro ao validar os campos',
      message: 'Erro ao validar os campos',
    }
  }

  return {
    success: true,
    message: 'Login efetuado com sucesso',
  }
}
