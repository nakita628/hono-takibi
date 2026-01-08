import { hc } from 'hono/client'
import routes from '../types/11-comprehensive'

export const client = hc<typeof routes>('/')
