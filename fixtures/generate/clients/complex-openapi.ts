import { hc } from 'hono/client'
import routes from '../types/complex-openapi'

export const client = hc<typeof routes>('/')
