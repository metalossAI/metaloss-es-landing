'use client'

import type { Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { PostBlockProps, LayoutType } from './types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import defaultCardImage from '../../../public/images/default-card-bg.jpg'

export const PostBlock: React.FC<PostBlockProps> = ({ post, layout = 'card', className }) => {
  if (!post) return null

  const { title, meta, slug, content } = post || {}
  const excerpt = post?.excerpt || { root: { children: [] } } // Default empty rich text structure
  const { image: metaImage } = meta || {}

  // Get the first paragraph or heading from content for the outline view
  const getFirstParagraph = () => {
    if (!content?.root?.children) return null;

    // Find the first paragraph or heading
    const firstBlock = content.root.children.find((node: any) =>
      node.type === 'p' || node.type.startsWith('heading')
    );

    // If no suitable block found, return empty content
    if (!firstBlock) return { root: { children: [] } };

    // Return a new content object with just this block
    return {
      root: {
        children: [firstBlock]
      }
    };
  };

  const previewContent = getFirstParagraph() || excerpt;

  const renderBanner = () => (
    <div className="container px-0 bg-card border border-border rounded-lg overflow-hidden">
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <div className="text-gray-200 line-clamp-2">
              <RichText data={excerpt} />
            </div>
            <Link
              href={`/posts/${slug}`}
              className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-medium"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCard = () => (
    <div className="container px-0 bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="relative w-full aspect-video">
        {metaImage && typeof metaImage !== 'string' ? (
          <ImageMedia resource={metaImage} fill className="object-cover" />
        ) : (
          <ImageMedia src={defaultCardImage} fill className="object-cover" />
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
          <RichText data={excerpt} />
        </div>
        <Link
          href={`/posts/${slug}`}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium mt-auto inline-block"
        >
          Read more
        </Link>
      </div>
    </div>
  )

  const renderOutline = () => (
    <div className="container px-0 bg-card border overflow-hidden flex flex-col md:flex-row h-full">
      <div className="md:w-1/3">
        <div className="relative left-0 w-full h-48 md:h-full">
          {metaImage && typeof metaImage !== 'string' ? (
            <ImageMedia resource={metaImage} fill className="object-cover" />
          ) : (
            <ImageMedia src={defaultCardImage} fill className="object-cover" />
          )}
        </div>
      </div>
      <div className="p-6 md:w-2/3 flex flex-col">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
          <RichText data={previewContent} className="line-clamp-4" />
          <div className="mt-2">
            <Link
              href={`/posts/${slug}`}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Read more →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )

  const renderLayout = () => {
    switch (layout) {
      case 'banner':
        return renderBanner()
      case 'outline':
        return renderOutline()
      case 'card':
      default:
        return renderCard()
    }
  }

  return (
    <div className={cn(
      layout === 'banner' ? 'col-span-full' : '',
      className,
      'justify-around'
    )}>
      {renderLayout()}
    </div>
  )
}
