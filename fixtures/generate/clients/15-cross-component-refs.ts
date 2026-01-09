import { hc } from 'hono/client'
import routes from '../types/15-cross-component-refs'

export const client = hc<typeof routes>('/')
