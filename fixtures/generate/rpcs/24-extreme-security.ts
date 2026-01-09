import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export async function getPublic(args?: { options?: ClientRequestOptions }) {
  return await client.public.$get(args)
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export async function getSingleAuth(args?: { options?: ClientRequestOptions }) {
  return await client['single-auth']['$get'](args)
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export async function getAnyAuth(args?: { options?: ClientRequestOptions }) {
  return await client['any-auth']['$get'](args)
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export async function getAllAuth(args?: { options?: ClientRequestOptions }) {
  return await client['all-auth']['$get'](args)
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export async function getComplexAuth(args?: { options?: ClientRequestOptions }) {
  return await client['complex-auth']['$get'](args)
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export async function getScopedOauth(args?: { options?: ClientRequestOptions }) {
  return await client['scoped-oauth']['$get'](args)
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export async function getMixedLevelSecurity(args?: { options?: ClientRequestOptions }) {
  return await client['mixed-level-security']['$get'](args)
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export async function putMixedLevelSecurity(args?: { options?: ClientRequestOptions }) {
  return await client['mixed-level-security']['$put'](args)
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export async function postMixedLevelSecurity(args?: { options?: ClientRequestOptions }) {
  return await client['mixed-level-security']['$post'](args)
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export async function deleteMixedLevelSecurity(args?: { options?: ClientRequestOptions }) {
  return await client['mixed-level-security']['$delete'](args)
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export async function getOverrideGlobal(args?: { options?: ClientRequestOptions }) {
  return await client['override-global']['$get'](args)
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export async function getOptionalEnhanced(args?: { options?: ClientRequestOptions }) {
  return await client['optional-enhanced']['$get'](args)
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export async function getMultiTenant(args?: { options?: ClientRequestOptions }) {
  return await client['multi-tenant']['$get'](args)
}
