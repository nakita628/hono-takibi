import { hc } from 'hono/client'
import routes from '../types/discriminated-union'

export const client = hc<typeof routes>('/')
