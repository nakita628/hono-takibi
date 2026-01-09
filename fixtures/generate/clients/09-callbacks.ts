import { hc } from 'hono/client'
import routes from '../types/09-callbacks'

export const client = hc<typeof routes>('/')
