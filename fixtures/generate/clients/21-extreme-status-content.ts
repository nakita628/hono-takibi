import { hc } from 'hono/client'
import routes from '../types/21-extreme-status-content'

export const client = hc<typeof routes>('/')
