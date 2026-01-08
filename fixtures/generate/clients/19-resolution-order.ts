import { hc } from 'hono/client'
import routes from '../types/19-resolution-order'

export const client = hc<typeof routes>('/')
