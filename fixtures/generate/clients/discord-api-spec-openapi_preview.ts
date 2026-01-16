import { hc } from 'hono/client'
import type routes from '../types/discord-api-spec-openapi_preview'

export const client = hc<typeof routes>('/')
