import { hc } from 'hono/client'
import type routes from '../types/23-extreme-parameters'

export const client = hc<typeof routes>('/')
