import { hc } from 'hono/client'
import type routes from '../types/discriminated-union'

export const client = hc<typeof routes>('/')
