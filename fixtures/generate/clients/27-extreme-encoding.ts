import { hc } from 'hono/client'
import routes from '../types/27-extreme-encoding'

export const client = hc<typeof routes>('/')
