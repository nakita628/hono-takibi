import { hc } from 'hono/client'
import routes from '../types/03-parameters-responses'

export const client = hc<typeof routes>('/')
