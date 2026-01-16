import { hc } from 'hono/client'
import type routes from '../types/10-complex-schemas'

export const client = hc<typeof routes>('/')
