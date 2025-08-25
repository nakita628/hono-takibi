import { randomUUID } from 'node:crypto'
import { sql } from 'drizzle-orm'
import { customType, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const isoDateTime = customType<{ data: string; driverData: string }>({
  dataType: () => 'text',
  toDriver: (value) => value,
  fromDriver: (value) => new Date(value).toISOString(),
})

export const todo = sqliteTable('post', {
  id: text('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  content: text('post').notNull(),
  createdAt: isoDateTime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: isoDateTime('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})
