import { hc } from 'hono/client'
import type routes from '../types/not-schema'

export const client = hc<typeof routes>('/')
