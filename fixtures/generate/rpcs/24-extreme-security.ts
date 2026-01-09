import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export async function getPublic(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.public.$get(args, options)
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export async function getSingleAuth(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['single-auth']['$get'](args, options)
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export async function getAnyAuth(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['any-auth']['$get'](args, options)
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export async function getAllAuth(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['all-auth']['$get'](args, options)
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export async function getComplexAuth(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['complex-auth']['$get'](args, options)
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export async function getScopedOauth(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['scoped-oauth']['$get'](args, options)
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export async function getMixedLevelSecurity(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['mixed-level-security']['$get'](args, options)
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export async function putMixedLevelSecurity(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['mixed-level-security']['$put'](args, options)
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export async function postMixedLevelSecurity(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['mixed-level-security']['$post'](args, options)
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export async function deleteMixedLevelSecurity(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['mixed-level-security']['$delete'](args, options)
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export async function getOverrideGlobal(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['override-global']['$get'](args, options)
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export async function getOptionalEnhanced(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['optional-enhanced']['$get'](args, options)
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export async function getMultiTenant(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['multi-tenant']['$get'](args, options)
}
