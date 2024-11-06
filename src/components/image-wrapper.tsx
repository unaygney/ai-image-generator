import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

import { Bookmark as IBookmark, Promt } from '@/lib/definitions'
import { createClient } from '@/lib/supabase/client'
import { cn, formatDate, getAspectRatio, getInitials } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { addBookmark } from '@/app/feed/actions'

import { Bookmark, DownArrow, Generate, X } from './icons'
import { Button } from './ui/button'

export default function ImageWrapper({
  post,
  bookmarks,
}: {
  post: Promt
  bookmarks: IBookmark | undefined
}) {
  const supabase = createClient()

  const router = useRouter()

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
  const handleDownload = async () => {
    const imagePath = post.image_url.split('/').pop()

    const { data, error } = await supabase.storage
      .from('prompt_images')
      .download(imagePath!)

    if (error) {
      toast.error('An error occurred while downloading the image')
    } else {
      const url = URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', post.promt)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  const handleGenerate = async () => {
    const encodedPrompt = encodeURIComponent(post.promt)
    router.push(`/?promt=${encodedPrompt}`)
  }

  return (
    <div className={`flex w-full break-inside-avoid flex-col gap-2.5`}>
      <Dialog>
        <DialogTrigger asChild>
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
        </DialogTrigger>
        <DialogContent className="h-[400px] w-full max-w-[820px] overflow-scroll bg-[#121826] px-6 lg:min-h-[592px]">
          <DialogClose asChild>
            <button className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-lg bg-[#212936]">
              <X />
            </button>
          </DialogClose>
          <DialogTitle className="sr-only">Preview Promt</DialogTitle>
          <DialogHeader>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex w-full flex-col gap-4 md:max-w-[292px]">
                <div className="relative h-[224px] w-full rounded-lg border-4 border-[#212936]">
                  <Image
                    src={post.image_url}
                    alt={post.promt}
                    fill
                    className="rounded-[4px] object-fill"
                  />
                </div>
                <button
                  onClick={handleDownload}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#212936] px-4 py-2 md:max-w-[131px]"
                >
                  <DownArrow />
                  <p>Download</p>
                </button>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
                    Promp details
                  </h3>
                  <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
                    {post.promt}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
                    Negative prompt
                  </h3>
                  <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
                    {post.negative_promt ? post.negative_promt : 'Null'}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
                    Created on
                  </h3>
                  <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
                    {formatDate(post.created_at)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
                    Input Resolution
                  </h3>
                  <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
                    {post.width} x {post.height} (
                    {getAspectRatio(post.width!, post.height!)})
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold tracking-[-0.42px] text-[#6c727f]">
                    Seed
                  </h3>
                  <p className="text-base font-normal tracking-[-0.56px] text-[#e4e4e7]">
                    {post.id}
                  </p>
                </div>
                <Button
                  type="submit"
                  onClick={handleGenerate}
                  className="h-12 w-full rounded-xl bg-[#7c71ff] text-base text-[#e4e4e7] hover:bg-[#7c71ff] hover:bg-opacity-85"
                >
                  <Generate />
                  Generate with this settings
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
