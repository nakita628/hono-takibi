import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export async function getPublic(options?: ClientRequestOptions) {
  return await parseResponse(client.public.$get(undefined, options))
}

/**
 * GET /protected
 */
export async function getProtected(options?: ClientRequestOptions) {
  return await parseResponse(client.protected.$get(undefined, options))
}

/**
 * GET /admin
 */
export async function getAdmin(options?: ClientRequestOptions) {
  return await parseResponse(client.admin.$get(undefined, options))
}

/**
 * GET /oauth-resource
 */
export async function getOauthResource(options?: ClientRequestOptions) {
  return await parseResponse(client['oauth-resource'].$get(undefined, options))
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-auth'].$get(undefined, options))
}
