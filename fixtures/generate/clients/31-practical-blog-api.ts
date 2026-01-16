import { hc } from 'hono/client'
import type routes from '../types/31-practical-blog-api'

export const client = hc<typeof routes>('/')
