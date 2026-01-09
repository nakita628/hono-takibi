import { hc } from 'hono/client'
import routes from '../types/additional'

export const client = hc<typeof routes>('/')
