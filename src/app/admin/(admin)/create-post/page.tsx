'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  Bold,
  Italic,
  Heading,
  Image as ImageIcon,
  Tag,
  Eye,
  Save,
} from 'lucide-react'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, content, category, tags, coverImage })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleAddTag = () => {
    const tag = prompt('Enter a tag:')
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="bg-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <ArrowLeft className="h-6 w-6 text-zinc-500" />
                <span className="ml-2 text-zinc-900 font-medium">
                  Back to Blog
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-zinc-900 mb-6">
            Create New Post
          </h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <form onSubmit={handleSubmit} className="flex-grow space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <div className="mt-1 border rounded-md">
                  <div className="flex items-center space-x-2 p-2 border-b">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Bold className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Bold</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Italic className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Italic</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Heading className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Heading</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here..."
                    className="min-h-[200px] border-none focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cover-image">Cover Image</Label>
                <div className="mt-1 flex items-center space-x-4">
                  <Label htmlFor="cover-image" className="cursor-pointer">
                    <div className="flex items-center justify-center w-32 h-32 bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors">
                      {coverImage ? (
                        <img
                          src={URL.createObjectURL(coverImage)}
                          alt="Cover preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-zinc-400" />
                      )}
                    </div>
                    <input
                      id="cover-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </Label>
                  <span className="text-sm text-zinc-500">
                    {coverImage ? coverImage.name : 'Click to upload an image'}
                  </span>
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index + 1}`}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Publish Post
              </Button>
            </form>

            <aside className="lg:w-64 space-y-4">
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Post Preview</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold">
                      {title || 'Untitled Post'}
                    </h2>
                    <p className="mt-2 text-zinc-600">
                      {content || 'No content yet.'}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
