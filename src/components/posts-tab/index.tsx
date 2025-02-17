'use client'

import { Edit, Plus, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PostResponse } from '@/types/post'
import { BASE_URL } from '@/constants/base-url'
import Image from 'next/image'
import { FIVE_MINUTES } from '@/constants/five-minutes'
import { formatedDate } from '@/lib/utils'

interface QueryPostResponse {
  posts: PostResponse[]
}

export function PostsTab() {
  const queryClient = new QueryClient()

  const { data } = useQuery<QueryPostResponse>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/posts`)
      return response.json()
    },
    staleTime: FIVE_MINUTES,
  })

  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const response = await fetch(`${BASE_URL}/api/posts/delete-post`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId }),
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar o post')
      }
      return response.json()
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const posts = data?.posts || []

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Posts Criados</h1>

      <div className="flex justify-between items-center mb-6">
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Criar Novo Post
        </Button>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={60}
                    height={40}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{formatedDate(post.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="hover:bg-muted hover:scale-105 transition-transform"
                  >
                    <Edit className="h-4 w-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="hover:bg-muted hover:scale-105 transition-transform z-50"
                    onClick={() => deletePostMutation.mutate(post.id)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}