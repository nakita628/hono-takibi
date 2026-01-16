import { hc } from 'hono/client'
import type routes from '../types/openapi-string'

export const client = hc<typeof routes>('/')
