import { getBookmarks } from '../feed/actions'
import { eq, inArray } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

import { createClient } from '@/lib/supabase/server'

import Collection from '@/components/collection'

import { db } from '@/db'
import { bookmarks, promptsTable } from '@/db/schema'

export default async function CollectionPage() {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()

  if (!user || !user.user?.id) {
    redirect('/')
  }

  const userBookmark = await db
    .select({
      prompt_ids: bookmarks.promt_ids,
    })
    .from(bookmarks)
    .where(eq(bookmarks.user_id, user.user?.id))

  const promptIds = userBookmark[0].prompt_ids

  const collection = await db
    .select()
    .from(promptsTable)
    .where(inArray(promptsTable.id, promptIds))

  const bm = await getBookmarks()

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold tracking-[-0.7px] text-[#e4e4e7]">
        My Collection
      </h1>
      <div className="w-full columns-1 gap-4 space-y-6 sm:columns-2 md:columns-3 lg:columns-4 lg:gap-6">
        {collection?.map((post) => (
          <Collection key={post.id} post={post} bookmarks={bm.bookmarks!} />
        ))}
      </div>
    </div>
  )
}
