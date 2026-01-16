import { hc } from 'hono/client'
import type routes from '../types/22-extreme-validation'

export const client = hc<typeof routes>('/')
