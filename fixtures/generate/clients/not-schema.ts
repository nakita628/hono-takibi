import { hc } from 'hono/client'
import routes from '../types/not-schema'

export const client = hc<typeof routes>('/')
