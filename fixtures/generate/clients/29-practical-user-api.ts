import { hc } from 'hono/client'
import type routes from '../types/29-practical-user-api'

export type Client = ReturnType<typeof hc<typeof routes>>

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof routes>(...args)

export const client = hcWithType('/')
