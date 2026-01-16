import { hc } from 'hono/client'
import type routes from '../types/abcde'

export const client = hc<typeof routes>('/')
