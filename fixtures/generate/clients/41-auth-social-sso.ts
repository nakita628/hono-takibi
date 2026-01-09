import { hc } from 'hono/client'
import routes from '../types/41-auth-social-sso'

export const client = hc<typeof routes>('/')
