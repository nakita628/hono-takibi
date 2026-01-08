import { hc } from 'hono/client'
import routes from '../types/38-auth-apikey-management'

export const client = hc<typeof routes>('/')
