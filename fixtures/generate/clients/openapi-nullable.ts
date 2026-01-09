import { hc } from 'hono/client'
import routes from '../types/openapi-nullable'

export const client = hc<typeof routes>('/')
