'use client'

import { Plus } from 'lucide-react'
// import { useState } from 'react'
import { Button } from '../ui/button'
// import { Input } from '../ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '../ui/table'
import { useQuery } from '@tanstack/react-query'
import type { Post } from '@/types/post'
import { PostTable } from '../post-table'
import { PostTableColumns } from '@/components/post-table/post-table-columns'

interface QueryPostResponse {
  posts: Post[]
}

export function PostsTab() {
  const { data } = useQuery<QueryPostResponse>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/posts')
      return response.json()
    },
  })

  const posts = data?.posts || []

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Posts Criados</h1>

      <div className="flex justify-between items-center mb-6">
        <Button variant="outline">
          {/* TODO */}
          <Plus className="mr-2 h-4 w-4" /> Create New Post
        </Button>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden">
        <PostTable data={posts} columns={PostTableColumns} />
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString('pt-br')}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost">
                    <Edit className="h-4 w-4 text-primary" />
                  </Button>
                  <Button variant="ghost">
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    </div>
  )
}
