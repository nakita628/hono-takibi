import { client } from '../index.ts'

/**
 * GET /public
 */
export async function getPublic() {
  return await client.public.$get()
}

/**
 * GET /protected
 */
export async function getProtected() {
  return await client.protected.$get()
}

/**
 * GET /admin
 */
export async function getAdmin() {
  return await client.admin.$get()
}

/**
 * GET /oauth-resource
 */
export async function getOauthResource() {
  return await client['oauth-resource'].$get()
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth() {
  return await client['multi-auth'].$get()
}
