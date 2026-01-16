import { hc } from 'hono/client'
import type routes from '../types/hono-rest-example'

export const client = hc<typeof routes>('/')
