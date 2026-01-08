import { hc } from 'hono/client'
import routes from '../types/35-auth-oauth2-server'

export const client = hc<typeof routes>('/')
