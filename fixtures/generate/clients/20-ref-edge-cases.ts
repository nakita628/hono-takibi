import { hc } from 'hono/client'
import type routes from '../types/20-ref-edge-cases'

export const client = hc<typeof routes>('/')
