'use client'

import { Search, Plus, Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import Link from 'next/link'

export function PostsTab() {
  const [searchTerm, setSearchTerm] = useState('')

  const posts = [
    {
      id: 1,
      title: 'Getting Started with React',
      status: 'published',
      date: '2023-05-15',
    },
    {
      id: 2,
      title: 'Advanced TypeScript Techniques',
      status: 'draft',
      date: '2023-05-20',
    },
    {
      id: 3,
      title: 'The Future of Web Development',
      status: 'published',
      date: '2023-05-25',
    },
  ]

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search posts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button variant="outline" asChild>
          <Link href="/admin/create-post">
            <Plus className="mr-2 h-4 w-4" /> Create New Post
          </Link>
        </Button>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>Posts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <Button variant="ghost">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button variant="ghost">
                    <Trash className="h-4 w-4 text-red-600" />
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
