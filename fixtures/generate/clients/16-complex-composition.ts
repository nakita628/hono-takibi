import { hc } from 'hono/client'
import routes from '../types/16-complex-composition'

export const client = hc<typeof routes>('/')
