import { sql } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const promptsTable = pgTable('promts', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid('user_id').notNull(),
  promt: text('promt').notNull(),
  negative_promt: text('negative_promt'),
  image_url: text('image_url').notNull(),
  width: integer('width'),
  height: integer('height'),
  guidance: integer('guidance_scale'),
  colors: text('colors')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  created_at: timestamp('created_at').defaultNow(),
  user_name: text('user_name'),
  user_avatar: text('user_avatar'),
})
export const bookmarks = pgTable('bookmarks', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid('user_id').notNull(),
  promt_ids: text('promt_ids')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
})
