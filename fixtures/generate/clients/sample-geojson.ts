import { hc } from 'hono/client'
import type routes from '../types/sample-geojson'

export const client = hc<typeof routes>('/')
