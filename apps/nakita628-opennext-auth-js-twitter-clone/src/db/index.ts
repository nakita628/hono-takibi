import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { Context } from 'effect'
import type * as schema from './schema'

export type Db = DrizzleD1Database<typeof schema>
export class DB extends Context.Tag('DB')<DB, Db>() {}
export * as schema from './schema'
