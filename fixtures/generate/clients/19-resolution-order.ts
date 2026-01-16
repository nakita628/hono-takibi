import { hc } from 'hono/client'
import type routes from '../types/19-resolution-order'

export const client = hc<typeof routes>('/')
