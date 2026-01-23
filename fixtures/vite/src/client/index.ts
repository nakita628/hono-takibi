import { hc } from 'hono/client'
import type { AppType } from '../index'

export type Client = ReturnType<typeof hc<AppType>>

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<AppType>(...args)

export const client = hcWithType('/')
