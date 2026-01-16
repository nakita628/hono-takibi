import { hc } from 'hono/client'
import type routes from '../types/37-auth-mfa'

export const client = hc<typeof routes>('/')
