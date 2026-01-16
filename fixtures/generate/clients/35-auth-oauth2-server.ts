import { hc } from 'hono/client'
import type routes from '../types/35-auth-oauth2-server'

export const client = hc<typeof routes>('/')
