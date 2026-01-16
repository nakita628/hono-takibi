import { hc } from 'hono/client'
import type routes from '../types/openapi-nullable'

export const client = hc<typeof routes>('/')
