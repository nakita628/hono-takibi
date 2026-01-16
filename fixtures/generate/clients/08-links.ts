import { hc } from 'hono/client'
import type routes from '../types/08-links'

export const client = hc<typeof routes>('/')
