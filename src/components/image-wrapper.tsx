import Image from 'next/image'
import React from 'react'

import { Promt } from '@/lib/definitions'
import { getAspectRatio } from '@/lib/utils'

export default function ImageWrapper({ post }: { post: Promt }) {
  const ratio = getAspectRatio(post.width!, post.height!)

  return (
    <div className={`relative w-full`}>
      <Image src={post.image_url} alt={post.promt} fill />
    </div>
  )
}
