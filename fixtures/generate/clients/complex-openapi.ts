import { hc } from 'hono/client'
import type routes from '../types/complex-openapi'

export const client = hc<typeof routes>('/')
