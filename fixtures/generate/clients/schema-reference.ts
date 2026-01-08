import { hc } from 'hono/client'
import routes from '../types/schema-reference'

export const client = hc<typeof routes>('/')
