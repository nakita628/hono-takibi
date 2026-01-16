import { hc } from 'hono/client'
import type routes from '../types/openapi-boolean'

export const client = hc<typeof routes>('/')
