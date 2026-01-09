import { hc } from 'hono/client'
import routes from '../types/13-deep-nested-refs'

export const client = hc<typeof routes>('/')
