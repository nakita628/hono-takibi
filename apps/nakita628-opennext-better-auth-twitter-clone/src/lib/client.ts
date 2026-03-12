/**
 * Hono RPC Client
 *
 * Creates a type-safe API client from the backend route definitions.
 * The `hc` function generates a client that mirrors the backend API structure,
 * so `client.posts.$get(...)` maps to `GET /api/posts`.
 *
 * All frontend hooks in `@/hooks` use this client to make API calls.
 *
 * ||| Data Flow |||
 *
 *   Frontend Component
 *       |
 *       v
 *   useXxx() hook  (SWR / SWR Mutation)
 *       |
 *       v
 *   client.xxx.$get / $post / $patch / $delete  (this file)
 *       |
 *       v
 *   Backend API  (Hono route handler)
 */
import { hc } from 'hono/client'
import type { api } from '@/backend'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/').api
