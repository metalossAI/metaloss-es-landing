import type { Post as BasePost } from '@/payload-types'

// Extend the base Post type to include the excerpt and content fields
type Post = BasePost & {
  excerpt?: any // You might want to replace 'any' with a more specific type for your rich text content
  content?: any // Add content field for the full post content
}

export type LayoutType = 'banner' | 'card' | 'outline'

export interface PostBlockProps {
  post: Post | null
  layout?: LayoutType
  className?: string
}
