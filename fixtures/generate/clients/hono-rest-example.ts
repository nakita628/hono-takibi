import { hc } from 'hono/client'
import routes from '../types/hono-rest-example'

export const client = hc<typeof routes>('/')
