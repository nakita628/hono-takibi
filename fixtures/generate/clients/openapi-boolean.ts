import { hc } from 'hono/client'
import routes from '../types/openapi-boolean'

export const client = hc<typeof routes>('/')
