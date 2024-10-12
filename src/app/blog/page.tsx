import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { PostResponse } from '@/types/post'
import { RocketIcon } from 'lucide-react'
import Link from 'next/link'
import { ModeTheme } from '@/components/mode-theme'
import { BASE_URL } from '@/constants/base-url'
import { formatedDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default async function Blog() {
  const response = await fetch(`${BASE_URL}/api/posts`, {
    cache: 'no-store',
  })

  const { posts } = (await response.json()) as { posts: PostResponse[] }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 shadow-md z-50 border-b border-primary backdrop-blur">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Blog{' '}
            <RocketIcon className="h-8 w-8 inline-block ml-2 text-primary" />
          </h1>
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className="hover:text-primary transition-colors duration-300"
            >
              Inicio
            </Link>
            <ModeTheme />
          </div>
          <div className="flex items-center md:hidden">
            <Button variant="link">
              <Link href="/">Voltar ao site</Link>
            </Button>

            <ModeTheme />
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Posts</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 && (
              <div className="text-center text-lg text-muted-foreground">
                No posts found
              </div>
            )}
            {posts.length > 0 &&
              posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </AspectRatio>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold leading-tight">
                      {post.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {formatedDate(post.createdAt)}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-2">
                      {post.caption}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="hover:bg-secondary text-center"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-3 pt-4">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/Kibryant.png"
                          alt="Arthur Gustavo"
                        />
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        Arthur Gustavo
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </>
  )
}
