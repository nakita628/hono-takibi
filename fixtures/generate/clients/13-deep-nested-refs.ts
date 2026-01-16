import { hc } from 'hono/client'
import type routes from '../types/13-deep-nested-refs'

export const client = hc<typeof routes>('/')
