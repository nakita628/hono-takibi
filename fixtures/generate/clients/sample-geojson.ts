import { hc } from 'hono/client'
import routes from '../types/sample-geojson'

export const client = hc<typeof routes>('/')
