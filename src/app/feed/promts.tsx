'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import React from 'react'

import { Loader } from '@/components/icons'

import { getBookmarks, getPrompts } from './actions'

const ImageWrapper = dynamic(() => import('@/components/image-wrapper'), {
  ssr: false,
})

export default function Prompts({
  search,
}: {
  search: string | string[] | undefined
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['posts', search],
    queryFn: () =>
      getPrompts(Array.isArray(search) ? search.join(' ') : search),
  })

  const { data: bookmarks } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => getBookmarks(),
  })

  const userBookmark = bookmarks?.success ? bookmarks.bookmarks : undefined

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader className="text-white" />
      </div>
    )
  }

  return (
    <div className="w-full columns-1 gap-4 space-y-6 sm:columns-2 md:columns-3 lg:columns-4 lg:gap-6">
      {data?.map((post) => (
        <ImageWrapper key={post.id} bookmarks={userBookmark} post={post} />
      ))}
    </div>
  )
}
