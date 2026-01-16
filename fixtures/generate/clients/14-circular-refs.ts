import { hc } from 'hono/client'
import type routes from '../types/14-circular-refs'

export const client = hc<typeof routes>('/')
