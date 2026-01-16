import { hc } from 'hono/client'
import type routes from '../types/schema-reference'

export const client = hc<typeof routes>('/')
