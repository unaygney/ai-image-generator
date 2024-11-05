'use server'

import { eq, sql } from 'drizzle-orm'

import { createClient } from '@/lib/supabase/server'

import { db } from '@/db'
import { bookmarks, promptsTable } from '@/db/schema'

export const getPrompts = async (search = '') => {
  const prompts = await db
    .select()
    .from(promptsTable)
    .where(search ? sql`promt ILIKE ${'%' + search + '%'}` : undefined)

  return prompts
}

export const addBookmark = async (id: string) => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'User not authenticated' }
  }

  const existingBookmark = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.user_id, user.id))

  if (existingBookmark.length === 0) {
    await db.insert(bookmarks).values({
      user_id: user.id,
      promt_ids: [id],
    })
    return { success: true, message: 'Prompt added to collection.' }
  } else {
    const promtIds = existingBookmark[0].promt_ids

    if (promtIds.includes(id)) {
      const updatedPromtIds = promtIds.filter((promtId) => promtId !== id)

      await db
        .update(bookmarks)
        .set({ promt_ids: updatedPromtIds })
        .where(eq(bookmarks.user_id, user.id))

      return { success: true, message: 'Prompt removed from collection.' }
    } else {
      const updatedPromtIds = [...promtIds, id]

      await db
        .update(bookmarks)
        .set({ promt_ids: updatedPromtIds })
        .where(eq(bookmarks.user_id, user.id))

      return { success: true, message: 'Prompt added to collection.' }
    }
  }
}

export const getBookmarks = async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'User not authenticated' }
  }

  let userBookmarks = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.user_id, user.id))

  if (userBookmarks.length === 0) {
    await db.insert(bookmarks).values({
      user_id: user.id,
      promt_ids: [],
    })

    userBookmarks = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.user_id, user.id))
  }

  return { success: true, bookmarks: userBookmarks[0] }
}
