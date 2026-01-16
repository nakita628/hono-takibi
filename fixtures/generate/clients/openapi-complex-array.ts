import { hc } from 'hono/client'
import type routes from '../types/openapi-complex-array'

export const client = hc<typeof routes>('/')
