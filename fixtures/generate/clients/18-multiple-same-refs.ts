import { hc } from 'hono/client'
import routes from '../types/18-multiple-same-refs'

export const client = hc<typeof routes>('/')
