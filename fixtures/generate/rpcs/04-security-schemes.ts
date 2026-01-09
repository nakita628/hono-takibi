import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export async function getPublic(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.public.$get(args, options)
}

/**
 * GET /protected
 */
export async function getProtected(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.protected.$get(args, options)
}

/**
 * GET /admin
 */
export async function getAdmin(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.admin.$get(args, options)
}

/**
 * GET /oauth-resource
 */
export async function getOauthResource(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['oauth-resource']['$get'](args, options)
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['multi-auth']['$get'](args, options)
}
