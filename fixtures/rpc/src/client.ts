import { hc } from 'hono/client'
import type { AppType } from './server'

/**
 * Hono RPC client for the test server.
 *
 * @remarks
 * This client is created using `hc` (Hono Client) and provides
 * type-safe access to all server endpoints.
 *
 * @example
 * ```ts
 * import { client } from './client'
 *
 * const response = await client.json.$get()
 * const data = await response.json()
 * ```
 */
export const client = hc<AppType>('http://localhost:3000')
