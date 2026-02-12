import { hc } from 'hono/client'
import type { api } from '@/backend'

export type Client = ReturnType<typeof hc<typeof api>>

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/')
