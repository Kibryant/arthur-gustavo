import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { createPost, createPostSchema, type CreatePostSchema } from '@/functions/create-post'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '@/lib/firebase'

export function useCreatePost() {
  const { toast } = useToast()

  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [newTag, setNewTag] = useState('')

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      caption: '',
      tags: [],
      category: '',
    },
    mode: 'onChange',
  })

  const tags = form.watch('tags')

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      form.setValue('tags', [...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleUploadImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(firebaseStorage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload progress: ${progress}%`)
        },
        (error) => {
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

  const handleRemoveImage = () => {
    setCoverImage(null)
  }

  const mutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPost,
    onSuccess: () => {
      toast({ title: 'Post criado com sucesso!', description: 'Seu post foi criado com sucesso!' })
      form.reset()
      setCoverImage(null)
    },
    onError: () => {
      toast({ title: 'Erro ao criar post', description: 'Aconteceu um erro ao criar o post', variant: 'destructive' })
    },
  })

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

  return {
    form,
    coverImage,
    newTag,
    setNewTag,
    tags,
    handleAddTag,
    handleRemoveTag,
    handleImageUpload,
    handleRemoveImage,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}