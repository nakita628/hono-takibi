import { hc } from 'hono/client'
import routes from '../types/openapi-array'

export const client = hc<typeof routes>('/')
