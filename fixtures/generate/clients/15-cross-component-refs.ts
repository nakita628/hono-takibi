import { hc } from 'hono/client'
import type routes from '../types/15-cross-component-refs'

export const client = hc<typeof routes>('/')
