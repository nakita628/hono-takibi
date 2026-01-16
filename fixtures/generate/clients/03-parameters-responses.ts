import { hc } from 'hono/client'
import type routes from '../types/03-parameters-responses'

export const client = hc<typeof routes>('/')
