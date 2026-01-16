import { hc } from 'hono/client'
import type routes from '../types/additional'

export const client = hc<typeof routes>('/')
