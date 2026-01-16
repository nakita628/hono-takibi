import { hc } from 'hono/client'
import type routes from '../types/41-auth-social-sso'

export const client = hc<typeof routes>('/')
