import { hc } from 'hono/client'
import routes from '../types/complex-schema-reference'

export const client = hc<typeof routes>('/')
