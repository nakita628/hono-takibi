import { hc } from 'hono/client'
import routes from '../types/self'

export const client = hc<typeof routes>('/')
