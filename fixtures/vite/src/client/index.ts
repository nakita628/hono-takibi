import { hc } from 'hono/client'
import type { AddType } from '../index'

export type Client = ReturnType<typeof hc<AddType>>

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<AddType>(...args)

export const client = hcWithType('/')
