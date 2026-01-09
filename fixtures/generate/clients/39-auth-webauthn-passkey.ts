import { hc } from 'hono/client'
import routes from '../types/39-auth-webauthn-passkey'

export const client = hc<typeof routes>('/')
