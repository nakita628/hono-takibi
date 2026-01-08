import { hc } from 'hono/client'
import routes from '../types/07-examples'

export const client = hc<typeof routes>('/')
