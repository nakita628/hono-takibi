import { hc } from 'hono/client'
import type routes from '../types/discord-api-spec-openapi_preview'

export type Client = ReturnType<typeof hc<typeof routes>>

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof routes>(...args)

export const client = hcWithType('/')
