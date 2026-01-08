import { hc } from 'hono/client'
import routes from '../types/openapi-number'

export const client = hc<typeof routes>('/')
