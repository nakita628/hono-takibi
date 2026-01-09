import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export async function getTest(
  args: { query: { refParam?: { id: string; name: string; value?: number } } },
  options?: ClientRequestOptions,
) {
  return await client.test.$get(args, options)
}

/**
 * GET /empty-refs
 */
export async function getEmptyRefs(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['empty-refs']['$get'](args, options)
}

/**
 * GET /unicode-refs
 */
export async function getUnicodeRefs(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['unicode-refs']['$get'](args, options)
}

/**
 * GET /special-chars
 */
export async function getSpecialChars(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['special-chars']['$get'](args, options)
}

/**
 * GET /numeric-start
 */
export async function getNumericStart(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['numeric-start']['$get'](args, options)
}

/**
 * GET /ref-in-allof
 */
export async function getRefInAllof(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['ref-in-allof']['$get'](args, options)
}

/**
 * GET /deeply-nested
 */
export async function getDeeplyNested(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['deeply-nested']['$get'](args, options)
}

/**
 * GET /same-name-diff-context
 */
export async function getSameNameDiffContext(
  args?: {} | undefined,
  options?: ClientRequestOptions,
) {
  return await client['same-name-diff-context']['$get'](args, options)
}
