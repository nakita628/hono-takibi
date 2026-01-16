import { hc } from 'hono/client'
import type routes from '../types/39-auth-webauthn-passkey'

export const client = hc<typeof routes>('/')
