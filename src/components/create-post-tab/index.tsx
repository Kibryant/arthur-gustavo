"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Save, Loader } from 'lucide-react'
import { ImageUploader } from './image-uploader'
import { PreviewModal } from './preview-modal'
import { RichTextEditor } from './rich-text-editor'
import { TagInput } from './tag-input'
import { useCreatePost } from './use-create-post'

export function CreatePostTab() {
  const {
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
    isSubmitting,
  } = useCreatePost()

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...form.register('title')} placeholder="Digite o título do post" className="mt-1" />
      </div>

      <RichTextEditor value={form.watch('caption')} onChange={(value) => form.setValue('caption', value)} />

      <div>
        <Label htmlFor="category">Categoria</Label>
        <Select onValueChange={(value) => form.setValue('category', value)} value={form.watch('category')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="DevOps">DevOps</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ImageUploader
        coverImage={coverImage}
        handleImageUpload={handleImageUpload}
        handleRemoveImage={handleRemoveImage}
      />

      <TagInput
        tags={tags}
        newTag={newTag}
        setNewTag={setNewTag}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
      />

      <div className="space-x-2">

      <PreviewModal
        title={form.watch('title')}
        caption={form.watch('caption')}
        tags={form.watch('tags')}
        category={form.watch('category')}
        coverImage={coverImage}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>

        </div>
    </form>
  )
}