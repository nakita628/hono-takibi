import { hc } from 'hono/client'
import routes from '../types/edge'

export const client = hc<typeof routes>('/')
