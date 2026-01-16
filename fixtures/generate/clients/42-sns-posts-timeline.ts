import { hc } from 'hono/client'
import type routes from '../types/42-sns-posts-timeline'

export const client = hc<typeof routes>('/')
