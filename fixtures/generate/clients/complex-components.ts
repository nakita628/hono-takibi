import { hc } from 'hono/client'
import type routes from '../types/complex-components'

export const client = hc<typeof routes>('/')
