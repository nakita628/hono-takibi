import { hc } from 'hono/client'
import type routes from '../types/21-extreme-status-content'

export const client = hc<typeof routes>('/')
