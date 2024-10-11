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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createPost,
  type CreatePostSchema,
  createPostSchema,
} from '@/functions/create-post'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { Form, FormField } from '../ui/form'
import { Badge } from '../ui/badge'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '@/lib/firebase'
import { Progress } from '../ui/progress'

const defaultValues: Partial<CreatePostSchema> = {
  title: '',
  caption: '',
  tags: [],
  category: '',
}

export function CreatePostTab() {
  const { toast } = useToast()

  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues,
    mode: 'onChange',
  })

  const mutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPost,
    onSuccess: () => {
      toast({
        title: 'Post criado com sucesso',
        description: 'Seu post foi criado com sucesso!',
      })

      form.reset()
      setCoverImage(null)
      setUploadProgress(0)
    },
    onError: () => {
      toast({
        title: 'Erro ao criar post',
        description: 'Aconteceu um erro ao criar o post',
        variant: 'destructive',
      })
    },
  })

  const tags = form.watch('tags')

  const onSubmit = async (data: CreatePostSchema) => {
    if (!coverImage) {
      toast({
        title: 'Erro ao criar post',
        description: 'Você precisa adicionar uma imagem de capa',
        variant: 'destructive',
      })
      return
    }

    const imageUrl = await handleUploadImage(coverImage)

    const postData = {
      ...data,
      imageUrl,
    }

    mutation.mutate(postData)
  }

  const handleUploadImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(firebaseStorage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress) // Atualizando o progresso de upload
        },
        (error) => {
          console.error('Erro no upload da imagem:', error)
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        },
      )
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      form.setValue('tags', [...tags, newTag.trim()])
      setNewTag('') // Limpa o campo de input da tag
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove),
    )
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Criar Novo Post</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    {...field}
                    placeholder="Digite o título do post"
                    className="mt-1"
                  />
                </div>
              )}
            />

            <FormField
              name="caption"
              control={form.control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="content">Legenda</Label>
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
                      {...field}
                      placeholder="Escreva o conteúdo do seu post aqui..."
                      className="min-h-[200px] border-none focus:ring-0"
                    />
                  </div>
                </div>
              )}
            />

            <div>
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value || 'Selecione uma categoria'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Frontend">Frontend</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="DevOps">DevOps</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
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
              <div className="mt-1 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={`tag-${index + 1}`}
                      variant="outline"
                      className="flex items-center space-x-2 px-3 py-1 rounded-full"
                    >
                      <span>{tag}</span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="ml-2 p-1 h-4 w-4"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <Input
                  placeholder="Digite uma Tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  className="w-40"
                />

                <Button
                  type="button"
                  onClick={handleAddTag}
                  className="w-40 mt-2"
                >
                  Adicionar Tag
                </Button>
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
                    <h2>{form.watch('title')}</h2>
                    <p>{form.watch('caption')}</p>
                    <div className="flex items-center space-x-2">
                      {form.watch('tags').map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <p>{form.watch('category')}</p>
                    {coverImage && (
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt="Cover preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {uploadProgress > 0 && (
                <Progress value={uploadProgress} className="w-40" />
              )}

              <Button type="submit" disabled={form.formState.isLoading}>
                {form.formState.isLoading ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Publicar Post
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  )
}
