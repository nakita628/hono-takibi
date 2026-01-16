import { hc } from 'hono/client'
import type routes from '../types/algolia'

export const client = hc<typeof routes>('/')
