'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { getPrompts } from './actions'

export default function Prompts() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPrompts(),
  })

  return (
    <div className="flex gap-4">
      {data?.map((post) => <div key={post.id}>{post.promt}</div>)}
    </div>
  )
}
