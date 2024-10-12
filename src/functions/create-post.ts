import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(5),
  caption: z.string().min(5),
  tags: z.array(z.string().min(2)),
  category: z.string().min(5),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>

export async function createPost(data: CreatePostSchema) {
  const response = await fetch('/api/admin/posts/create-post', {
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
    message: 'Post criado com sucesso',
  }
}
