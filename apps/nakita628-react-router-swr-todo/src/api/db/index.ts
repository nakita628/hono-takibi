import { env } from 'cloudflare:workers'
import { Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'
import type { Database } from './schema'

export const db = new Kysely<Database>({
  dialect: new D1Dialect({ database: env.DB }),
})
