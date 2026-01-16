import { hc } from 'hono/client'
import type routes from '../types/45-sns-settings-moderation'

export const client = hc<typeof routes>('/')
