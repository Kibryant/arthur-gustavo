export interface Post {
  id: number
  title: string
  tags: string[]
  category: string
  imageUrl: string
  caption: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface PostResponse {
  id: number
  title: string
  tags: string[]
  category: string
  imageUrl: string
  caption: string
  createdAt: string
  updatedAt: string
  userId: string
}
