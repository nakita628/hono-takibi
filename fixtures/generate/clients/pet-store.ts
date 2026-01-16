import { hc } from 'hono/client'
import type routes from '../types/pet-store'

export const client = hc<typeof routes>('/')
