import { hc } from 'hono/client'
import type routes from '../types/openapi-number'

export const client = hc<typeof routes>('/')
