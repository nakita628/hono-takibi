import type { ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getPublic(options?: ClientRequestOptions) {
  return await client.public.$get(undefined, options)
}

export async function getBearerProtected(options?: ClientRequestOptions) {
  return await client['bearer-protected'].$get(undefined, options)
}

export async function getApiKeyProtected(options?: ClientRequestOptions) {
  return await client['api-key-protected'].$get(undefined, options)
}

export async function getBasicProtected(options?: ClientRequestOptions) {
  return await client['basic-protected'].$get(undefined, options)
}

export async function getOauthProtected(options?: ClientRequestOptions) {
  return await client['oauth-protected'].$get(undefined, options)
}

export async function getMultiAuth(options?: ClientRequestOptions) {
  return await client['multi-auth'].$get(undefined, options)
}
