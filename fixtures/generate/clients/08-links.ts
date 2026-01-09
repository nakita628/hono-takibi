import { hc } from 'hono/client'
import routes from '../types/08-links'

export const client = hc<typeof routes>('/')
