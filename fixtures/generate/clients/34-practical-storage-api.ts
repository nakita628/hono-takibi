import { hc } from 'hono/client'
import type routes from '../types/34-practical-storage-api'

export const client = hc<typeof routes>('/')
