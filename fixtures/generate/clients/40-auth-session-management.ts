import { hc } from 'hono/client'
import type routes from '../types/40-auth-session-management'

export const client = hc<typeof routes>('/')
