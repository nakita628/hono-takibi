import { hc } from 'hono/client'
import routes from '../types/05-request-bodies'

export const client = hc<typeof routes>('/')
