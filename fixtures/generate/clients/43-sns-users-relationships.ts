import { hc } from 'hono/client'
import routes from '../types/43-sns-users-relationships'

export const client = hc<typeof routes>('/')
