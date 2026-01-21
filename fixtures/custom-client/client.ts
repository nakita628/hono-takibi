import { hc } from 'hono/client'
import type routes from './types'

export const authClient = hc<typeof routes>('/')
