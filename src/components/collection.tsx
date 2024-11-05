'use client'

import Image from 'next/image'
import toast from 'react-hot-toast'

import { Bookmark as IBookmark, Promt } from '@/lib/definitions'
import { cn, getInitials } from '@/lib/utils'

import { addBookmark } from '@/app/feed/actions'

import { Bookmark } from './icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Collection({
  post,
  bookmarks,
}: {
  post: Promt
  bookmarks: IBookmark
}) {
  const handleBookmark = async () => {
    const res = await addBookmark(post.id)

    if (res.success) {
      toast.success(res.message)
      setTimeout(() => {
        window.location.reload()
      }, 350)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className={`flex w-full break-inside-avoid flex-col gap-2.5`}>
      <div
        className="relative min-h-[190px] w-full rounded-lg border-4 border-[#212936]"
        style={{
          height: post.height! / 2.5,
        }}
      >
        <Image
          src={post.image_url}
          alt={post.promt}
          fill
          className="rounded-[4px] object-cover"
        />
      </div>

      <div className="flex h-7 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.user_avatar ?? ''} />
            <AvatarFallback>
              {getInitials(post.user_name ?? 'Unknown')}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs font-medium tracking-[-0.42px] text-[#f3f4f6]">
            {post.user_name}
          </p>
        </div>
        <button
          onClick={handleBookmark}
          className={cn(
            'inline-flex h-full w-7 items-center justify-center rounded bg-[#212936]',
            {
              'bg-[#7C71FF]': bookmarks?.promt_ids.includes(post.id),
            }
          )}
        >
          <Bookmark />
        </button>
      </div>
    </div>
  )
}
