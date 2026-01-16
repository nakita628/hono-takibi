import { hc } from 'hono/client'
import type routes from '../types/06-headers'

export const client = hc<typeof routes>('/')
