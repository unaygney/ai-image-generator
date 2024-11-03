import { sql } from 'drizzle-orm'
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const promptsTable = pgTable('promt', {
  id: serial('id').primaryKey(),
  user_id: uuid('user_id').notNull(),
  promt: text('content').notNull(),
  image_url: text('image_url').notNull(),
  width: integer('width'),
  height: integer('height'),
  guidance: integer('guidance_scale'),
  colors: text('colors')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  created_at: timestamp('created_at').defaultNow(),
})
