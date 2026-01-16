import { hc } from 'hono/client'
import type routes from '../types/30-practical-ecommerce-api'

export const client = hc<typeof routes>('/')
