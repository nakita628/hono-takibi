import { hc } from 'hono/client'
import routes from '../types/44-sns-notifications-dm-search'

export const client = hc<typeof routes>('/')
