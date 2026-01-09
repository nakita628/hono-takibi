import { hc } from 'hono/client'
import routes from '../types/26-extreme-features'

export const client = hc<typeof routes>('/')
