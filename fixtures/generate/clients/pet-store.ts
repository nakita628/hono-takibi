import { hc } from 'hono/client'
import routes from '../types/pet-store'

export const client = hc<typeof routes>('/')
