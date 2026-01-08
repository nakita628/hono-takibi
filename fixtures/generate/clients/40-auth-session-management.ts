import { hc } from 'hono/client'
import routes from '../types/40-auth-session-management'

export const client = hc<typeof routes>('/')
