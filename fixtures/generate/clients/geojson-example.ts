import { hc } from 'hono/client'
import type routes from '../types/geojson-example'

export const client = hc<typeof routes>('/')
