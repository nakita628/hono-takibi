import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { Context } from 'effect'
import type * as schema from '@/db/schema'

// Hono Bindings
export type Bindings = {
  DB: D1Database
  AUTH_SECRET: string
}

// Hono Variables
export type Variables = {
  db: DrizzleD1Database<typeof schema>
}

// Hono App Environment
export type AppEnv = {
  Bindings: Bindings
  Variables: Variables
}

// Effect Service Tag: DB client
export class DbClient extends Context.Tag('DbClient')<
  DbClient,
  DrizzleD1Database<typeof schema>
>() {}
