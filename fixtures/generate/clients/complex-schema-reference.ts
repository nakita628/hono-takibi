import { hc } from 'hono/client'
import type routes from '../types/complex-schema-reference'

export const client = hc<typeof routes>('/')
