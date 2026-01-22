import { hc } from 'hono/client'
import routes from '../types'

export const client = hc<typeof routes>('/')
