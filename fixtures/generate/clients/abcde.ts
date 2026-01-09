import { hc } from 'hono/client'
import routes from '../types/abcde'

export const client = hc<typeof routes>('/')
