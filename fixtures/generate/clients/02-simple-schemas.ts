import { hc } from 'hono/client'
import routes from '../types/02-simple-schemas'

export const client = hc<typeof routes>('/')
