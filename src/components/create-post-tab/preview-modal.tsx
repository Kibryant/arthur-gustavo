import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'
  import { Button } from '@/components/ui/button'
  import { Eye } from 'lucide-react'
  
  interface PreviewModalProps {
    title: string
    caption: string
    tags: string[]
    category: string
    coverImage: File | null
  }
  
  export function PreviewModal({
    title,
    caption,
    tags,
    category,
    coverImage,
  }: PreviewModalProps) {
    return (
      <Dialog>
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
            <h2>{title}</h2>
            <p>{caption}</p>
            <div className="flex items-center space-x-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-zinc-100 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p>{category}</p>
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
    )
  }