import { hc } from 'hono/client'
import routes from '../types/04-security-schemes'

export const client = hc<typeof routes>('/')
