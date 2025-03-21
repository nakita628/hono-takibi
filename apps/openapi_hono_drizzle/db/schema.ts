import { randomUUID } from 'node:crypto'
import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const post = sqliteTable('post', {
  id: text('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  post: text('post').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})
