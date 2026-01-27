import { Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'
import type { Database } from './schema'

/**
 * Creates a Kysely database instance for D1.
 *
 * @param d1 - The D1Database binding from Cloudflare Workers
 * @returns A Kysely instance configured for D1
 */
export const createDb = (d1: D1Database): Kysely<Database> =>
  new Kysely<Database>({
    dialect: new D1Dialect({ database: d1 }),
  })

export type { Database } from './schema'
