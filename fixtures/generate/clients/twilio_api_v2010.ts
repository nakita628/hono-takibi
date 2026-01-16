import { hc } from 'hono/client'
import type routes from '../types/twilio_api_v2010'

export const client = hc<typeof routes>('/')
