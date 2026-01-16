import { hc } from 'hono/client'
import type routes from '../types/fizz-buzz'

export const client = hc<typeof routes>('/')
