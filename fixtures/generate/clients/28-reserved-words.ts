import { hc } from 'hono/client'
import type routes from '../types/28-reserved-words'

export const client = hc<typeof routes>('/')
