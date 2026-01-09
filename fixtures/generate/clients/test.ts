import { hc } from 'hono/client'
import routes from '../types/test'

export const client = hc<typeof routes>('/')
