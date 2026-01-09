import { hc } from 'hono/client'
import routes from '../types/25-pathological-schemas'

export const client = hc<typeof routes>('/')
