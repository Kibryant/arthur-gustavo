import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  tag: z.string().min(1, 'A tag é obrigatória'),
  status: z
    .enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELED'])
    .optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
