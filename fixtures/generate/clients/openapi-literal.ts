import { hc } from 'hono/client'
import type routes from '../types/openapi-literal'

export const client = hc<typeof routes>('/')
