import { hc } from 'hono/client'
import type routes from '../types'

type AppType = typeof routes

export const client = hc<AppType>('/api')
