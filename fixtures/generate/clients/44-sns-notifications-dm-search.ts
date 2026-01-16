import { hc } from 'hono/client'
import type routes from '../types/44-sns-notifications-dm-search'

export const client = hc<typeof routes>('/')
