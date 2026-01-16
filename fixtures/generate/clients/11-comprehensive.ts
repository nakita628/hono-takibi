import { hc } from 'hono/client'
import type routes from '../types/11-comprehensive'

export const client = hc<typeof routes>('/')
