import { hc } from 'hono/client'
import type routes from '../types/self'

export const client = hc<typeof routes>('/')
