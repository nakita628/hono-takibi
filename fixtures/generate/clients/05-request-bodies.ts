import { hc } from 'hono/client'
import type routes from '../types/05-request-bodies'

export const client = hc<typeof routes>('/')
