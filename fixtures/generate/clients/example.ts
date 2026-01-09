import { hc } from 'hono/client'
import routes from '../types/example'

export const client = hc<typeof routes>('/')
