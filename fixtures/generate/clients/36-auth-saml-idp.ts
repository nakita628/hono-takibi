import { hc } from 'hono/client'
import routes from '../types/36-auth-saml-idp'

export const client = hc<typeof routes>('/')
