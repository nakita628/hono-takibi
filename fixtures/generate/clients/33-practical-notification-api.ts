import { hc } from 'hono/client'
import routes from '../types/33-practical-notification-api'

export const client = hc<typeof routes>('/')
