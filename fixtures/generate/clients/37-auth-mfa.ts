import { hc } from 'hono/client'
import routes from '../types/37-auth-mfa'

export const client = hc<typeof routes>('/')
