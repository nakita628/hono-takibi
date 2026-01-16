import { hc } from 'hono/client'
import type routes from '../types/edge'

export const client = hc<typeof routes>('/')
