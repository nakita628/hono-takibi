import { hc } from 'hono/client'
import routes from '../types/14-circular-refs'

export const client = hc<typeof routes>('/')
