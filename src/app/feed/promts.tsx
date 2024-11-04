'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import ImageWrapper from '@/components/image-wrapper'

import { getPrompts } from './actions'

export default function Prompts() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPrompts(),
  })

  return (
    <div className="grid min-h-screen w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.map((post) => <ImageWrapper key={post.id} post={post} />)}
    </div>
  )
}
