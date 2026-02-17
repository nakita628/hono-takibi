import { hc } from 'hono/client'
import type { api } from './index'

export const client = hc<typeof api>('http://localhost:3000').api
