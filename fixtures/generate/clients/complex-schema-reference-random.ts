import { hc } from 'hono/client'
import routes from '../types/complex-schema-reference-random'

export const client = hc<typeof routes>('/')
