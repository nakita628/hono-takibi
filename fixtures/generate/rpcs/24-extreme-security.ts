import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export async function getPublic(options?: ClientRequestOptions) {
  return await client.public.$get(undefined, options)
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export async function getSingleAuth(options?: ClientRequestOptions) {
  return await client['single-auth'].$get(undefined, options)
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export async function getAnyAuth(options?: ClientRequestOptions) {
  return await client['any-auth'].$get(undefined, options)
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export async function getAllAuth(options?: ClientRequestOptions) {
  return await client['all-auth'].$get(undefined, options)
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export async function getComplexAuth(options?: ClientRequestOptions) {
  return await client['complex-auth'].$get(undefined, options)
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export async function getScopedOauth(options?: ClientRequestOptions) {
  return await client['scoped-oauth'].$get(undefined, options)
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export async function getMixedLevelSecurity(options?: ClientRequestOptions) {
  return await client['mixed-level-security'].$get(undefined, options)
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export async function putMixedLevelSecurity(options?: ClientRequestOptions) {
  return await client['mixed-level-security'].$put(undefined, options)
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export async function postMixedLevelSecurity(options?: ClientRequestOptions) {
  return await client['mixed-level-security'].$post(undefined, options)
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export async function deleteMixedLevelSecurity(options?: ClientRequestOptions) {
  return await client['mixed-level-security'].$delete(undefined, options)
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export async function getOverrideGlobal(options?: ClientRequestOptions) {
  return await client['override-global'].$get(undefined, options)
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export async function getOptionalEnhanced(options?: ClientRequestOptions) {
  return await client['optional-enhanced'].$get(undefined, options)
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export async function getMultiTenant(options?: ClientRequestOptions) {
  return await client['multi-tenant'].$get(undefined, options)
}
