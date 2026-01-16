import { hc } from 'hono/client'
import type routes from '../types/18-multiple-same-refs'

export const client = hc<typeof routes>('/')
