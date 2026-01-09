import { hc } from 'hono/client'
import routes from '../types/12-edge-cases'

export const client = hc<typeof routes>('/')
