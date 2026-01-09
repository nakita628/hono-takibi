import { hc } from 'hono/client'
import routes from '../types/24-extreme-security'

export const client = hc<typeof routes>('/')
