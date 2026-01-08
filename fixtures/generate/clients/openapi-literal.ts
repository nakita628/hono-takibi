import { hc } from 'hono/client'
import routes from '../types/openapi-literal'

export const client = hc<typeof routes>('/')
