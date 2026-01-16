import { hc } from 'hono/client'
import type routes from '../types/29-practical-user-api'

export const client = hc<typeof routes>('/')
