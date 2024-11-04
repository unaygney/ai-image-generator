'use server'

import { db } from '@/db'
import { promptsTable } from '@/db/schema'

export const getPrompts = async () => {
  const promts = await db.select().from(promptsTable)

  return promts
}
