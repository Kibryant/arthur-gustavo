'use client'

import { useState } from 'react'
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
  Bold,
  Italic,
  Heading,
  Image as ImageIcon,
  Tag,
  Eye,
  Save,
  Loader,
  X,
} from 'lucide-react'

export function CreatePostTab() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulação de requisição
    setTimeout(() => {
      console.log({ title, content, category, tags, coverImage })
      setIsLoading(false)
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleAddTag = () => {
    const tag = prompt('Digite uma tag:')
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Criar Novo Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do post"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Tecnologia</SelectItem>
                <SelectItem value="lifestyle">Estilo de Vida</SelectItem>
                <SelectItem value="travel">Viagem</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content">Conteúdo</Label>
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
                      <p>Negrito</p>
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
                      <p>Itálico</p>
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
                      <p>Título</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva o conteúdo do seu post aqui..."
                className="min-h-[200px] border-none focus:ring-0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cover-image">Imagem de Capa</Label>
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
                  className="hidden"
                />
              </Label>
              {coverImage && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setCoverImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="mt-1 flex items-center space-x-4">
              <Button type="button" onClick={handleAddTag} variant="outline">
                <Tag className="h-4 w-4 mr-2" /> Adicionar Tag
              </Button>
              <div className="flex space-x-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-zinc-100 text-zinc-900"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-zinc-400 hover:text-zinc-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="secondary">
                  <Eye className="h-4 w-4 mr-2" /> Visualizar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pré-visualização do Post</DialogTitle>
                </DialogHeader>
                <div className="prose max-w-none">
                  <h1>{title}</h1>
                  <p>{content}</p>
                </div>
              </DialogContent>
            </Dialog>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Publicar Post
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
