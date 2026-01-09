import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export async function getPublic(args?: { options?: ClientRequestOptions }) {
  return await client.public.$get(args)
}

/**
 * GET /protected
 */
export async function getProtected(args?: { options?: ClientRequestOptions }) {
  return await client.protected.$get(args)
}

/**
 * GET /admin
 */
export async function getAdmin(args?: { options?: ClientRequestOptions }) {
  return await client.admin.$get(args)
}

/**
 * GET /oauth-resource
 */
export async function getOauthResource(args?: { options?: ClientRequestOptions }) {
  return await client['oauth-resource']['$get'](args)
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth(args?: { options?: ClientRequestOptions }) {
  return await client['multi-auth']['$get'](args)
}
