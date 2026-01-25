import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export type DrizzleDB = ReturnType<typeof createDb>

/**
 * Creates a Drizzle database instance for D1.
 *
 * @param d1 - The D1Database binding from Cloudflare Workers
 * @returns A Drizzle instance configured for D1
 */
export const createDb = (d1: D1Database) => drizzle(d1, { schema })

export type { NewTodo, Todo } from './schema'
export { todos } from './schema'
