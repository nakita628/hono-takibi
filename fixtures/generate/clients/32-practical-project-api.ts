import { hc } from 'hono/client'
import type routes from '../types/32-practical-project-api'

export const client = hc<typeof routes>('/')
