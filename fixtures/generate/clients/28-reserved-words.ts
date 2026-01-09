import { hc } from 'hono/client'
import routes from '../types/28-reserved-words'

export const client = hc<typeof routes>('/')
