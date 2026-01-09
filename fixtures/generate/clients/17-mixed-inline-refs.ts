import { hc } from 'hono/client'
import routes from '../types/17-mixed-inline-refs'

export const client = hc<typeof routes>('/')
