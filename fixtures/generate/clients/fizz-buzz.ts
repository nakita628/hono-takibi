import { hc } from 'hono/client'
import routes from '../types/fizz-buzz'

export const client = hc<typeof routes>('/')
