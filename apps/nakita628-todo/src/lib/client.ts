import { hc } from 'hono/client'
import type { AppType } from '@/api'

/**
 * Type-safe RPC client for the Todo API.
 *
 * @remarks
 * This client is configured to communicate with the API at the root path.
 * All requests are typed based on the {@link AppType} definition.
 *
 * @example
 * ```typescript
 * const response = await client.todo.$get({ query: { limit: 10 } })
 * if (response.ok) {
 *   const todos = await response.json()
 * }
 * ```
 */
export const client = hc<AppType>('/').api
