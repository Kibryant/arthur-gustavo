import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  newTag: string
    setNewTag: (tag: string) => void
  handleAddTag: () => void
  handleRemoveTag: (tag: string) => void
}

export function TagInput({ tags, newTag, setNewTag, handleAddTag, handleRemoveTag }: TagInputProps) {
  return (
    <div className="space-y-2">
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

      <Button type="button" onClick={handleAddTag} className="w-40 mt-2">
        Adicionar Tag
      </Button>
    </div>
  )
}