import { hc } from 'hono/client'
import type routes from '../types/27-extreme-encoding'

export const client = hc<typeof routes>('/')
