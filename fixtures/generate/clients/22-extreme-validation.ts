import { hc } from 'hono/client'
import routes from '../types/22-extreme-validation'

export const client = hc<typeof routes>('/')
