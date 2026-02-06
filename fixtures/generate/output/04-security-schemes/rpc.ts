import type { ClientRequestOptions } from 'hono/client'
import { client } from './client'

/**
 * GET /public
 */
export async function getPublic(options?: ClientRequestOptions) {
  return await client.public.$get(undefined, options)
}

/**
 * GET /bearer-protected
 */
export async function getBearerProtected(options?: ClientRequestOptions) {
  return await client['bearer-protected'].$get(undefined, options)
}

/**
 * GET /api-key-protected
 */
export async function getApiKeyProtected(options?: ClientRequestOptions) {
  return await client['api-key-protected'].$get(undefined, options)
}

/**
 * GET /basic-protected
 */
export async function getBasicProtected(options?: ClientRequestOptions) {
  return await client['basic-protected'].$get(undefined, options)
}

/**
 * GET /oauth-protected
 */
export async function getOauthProtected(options?: ClientRequestOptions) {
  return await client['oauth-protected'].$get(undefined, options)
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth(options?: ClientRequestOptions) {
  return await client['multi-auth'].$get(undefined, options)
}
