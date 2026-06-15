import { hc } from 'hono/client'
import type routes from './type'

export const client = hc<typeof routes>('http://localhost')
