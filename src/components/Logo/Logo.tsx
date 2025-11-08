'use client'
import clsx from 'clsx'
import React, { useEffect } from 'react'

interface Props {
  color: 'light' | 'dark'
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low',
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, color } = props
  const [src, setSrc] = React.useState('/api/media/file/logo.svg')

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  useEffect(() => {
    setSrc(color === 'light' ? '/api/media/file/logo.svg' : '/api/media/file/logo-black.svg')
  }, [color])

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Metaloss logo"
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[2.8rem]', className)}
      src={src}
    />
  )
}

export const LogoText = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, color } = props
  const [src, setSrc] = React.useState('/api/media/file/mainLogo.svg')

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  useEffect(() => {
    setSrc(color === 'light' ? '/api/media/file/logo_text_white.png' : '/api/media/file/logo_text_black.png')
  }, [color])

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Metaloss logo text"
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[5.375rem] w-full', className)}
      src={src}
    />
  )
}