import { hc } from 'hono/client'
import type routes from '../types/07-examples'

export const client = hc<typeof routes>('/')
