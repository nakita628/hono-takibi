import { hc } from 'hono/client'
import type routes from '../types/01-minimal'

export const client = hc<typeof routes>('/')
