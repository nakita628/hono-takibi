import { hc } from 'hono/client'
import type routes from '../types/spotify'

export const client = hc<typeof routes>('/')
