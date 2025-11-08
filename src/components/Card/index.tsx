'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { ImageMedia } from '../Media/ImageMedia'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export type LayoutType = 'card' | 'square' | 'banner';

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  layout?: LayoutType
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, layout } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const getLayoutClasses = () => {
    switch(layout) {
      case 'square':
        return 'aspect-square';
      case 'banner':
        return 'flex flex-row items-center h-[400px]';
      default:
        return '';
    }
  };

  return (
    <article
      className={cn(
        'border border-border/50 hover:border-border rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm hover:cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]',
        getLayoutClasses(),
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        {!metaImage && <img src="/images/default-card-bg.jpg" className="w-full h-full object-cover" />}
        {metaImage && typeof metaImage !== 'string' && <ImageMedia resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
