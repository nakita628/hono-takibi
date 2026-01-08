import { hc } from 'hono/client'
import routes from '../types/openapi-string'

export const client = hc<typeof routes>('/')
