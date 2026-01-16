import { hc } from 'hono/client'
import type routes from '../types/example'

export const client = hc<typeof routes>('/')
