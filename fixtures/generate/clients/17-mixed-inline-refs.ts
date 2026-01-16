import { hc } from 'hono/client'
import type routes from '../types/17-mixed-inline-refs'

export const client = hc<typeof routes>('/')
