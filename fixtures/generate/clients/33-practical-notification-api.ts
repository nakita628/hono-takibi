import { hc } from 'hono/client'
import type routes from '../types/33-practical-notification-api'

export const client = hc<typeof routes>('/')
