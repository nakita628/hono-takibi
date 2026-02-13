import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

const mod = await import('cloudflare:workers').catch(() => null)
export const db = mod ? drizzle(mod.env.DB, { schema }) : (undefined as never)
export * as schema from './schema'
