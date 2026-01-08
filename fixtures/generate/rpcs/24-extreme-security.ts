import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export async function getPublic() {
  return await client.public.$get()
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export async function getSingleAuth() {
  return await client['single-auth']['$get']()
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export async function getAnyAuth() {
  return await client['any-auth']['$get']()
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export async function getAllAuth() {
  return await client['all-auth']['$get']()
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export async function getComplexAuth() {
  return await client['complex-auth']['$get']()
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export async function getScopedOauth() {
  return await client['scoped-oauth']['$get']()
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export async function getMixedLevelSecurity() {
  return await client['mixed-level-security']['$get']()
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export async function putMixedLevelSecurity() {
  return await client['mixed-level-security']['$put']()
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export async function postMixedLevelSecurity() {
  return await client['mixed-level-security']['$post']()
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export async function deleteMixedLevelSecurity() {
  return await client['mixed-level-security']['$delete']()
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export async function getOverrideGlobal() {
  return await client['override-global']['$get']()
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export async function getOptionalEnhanced() {
  return await client['optional-enhanced']['$get']()
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export async function getMultiTenant() {
  return await client['multi-tenant']['$get']()
}
