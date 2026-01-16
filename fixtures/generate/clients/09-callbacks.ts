import { hc } from 'hono/client'
import type routes from '../types/09-callbacks'

export const client = hc<typeof routes>('/')
