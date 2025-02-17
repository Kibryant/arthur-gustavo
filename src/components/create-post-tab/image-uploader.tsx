import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Image as ImageIcon, X } from 'lucide-react'

interface ImageUploaderProps {
    coverImage: File | null
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleRemoveImage: () => void
}

export function ImageUploader({ coverImage, handleImageUpload, handleRemoveImage }: ImageUploaderProps) {
  return (
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
          <Button variant="destructive" size="icon" onClick={handleRemoveImage}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}