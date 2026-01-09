import { hc } from 'hono/client'
import routes from '../types/complex-components'

export const client = hc<typeof routes>('/')
