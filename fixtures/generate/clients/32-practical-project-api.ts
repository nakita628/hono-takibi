import { hc } from 'hono/client'
import routes from '../types/32-practical-project-api'

export const client = hc<typeof routes>('/')
