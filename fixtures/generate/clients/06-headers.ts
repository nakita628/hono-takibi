import { hc } from 'hono/client'
import routes from '../types/06-headers'

export const client = hc<typeof routes>('/')
