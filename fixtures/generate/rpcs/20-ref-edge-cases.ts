import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export async function getTest(args: {
  query: { refParam?: { id: string; name: string; value?: number } }
  options?: ClientRequestOptions
}) {
  return await client.test.$get(args)
}

/**
 * GET /empty-refs
 */
export async function getEmptyRefs(args?: { options?: ClientRequestOptions }) {
  return await client['empty-refs']['$get'](args)
}

/**
 * GET /unicode-refs
 */
export async function getUnicodeRefs(args?: { options?: ClientRequestOptions }) {
  return await client['unicode-refs']['$get'](args)
}

/**
 * GET /special-chars
 */
export async function getSpecialChars(args?: { options?: ClientRequestOptions }) {
  return await client['special-chars']['$get'](args)
}

/**
 * GET /numeric-start
 */
export async function getNumericStart(args?: { options?: ClientRequestOptions }) {
  return await client['numeric-start']['$get'](args)
}

/**
 * GET /ref-in-allof
 */
export async function getRefInAllof(args?: { options?: ClientRequestOptions }) {
  return await client['ref-in-allof']['$get'](args)
}

/**
 * GET /deeply-nested
 */
export async function getDeeplyNested(args?: { options?: ClientRequestOptions }) {
  return await client['deeply-nested']['$get'](args)
}

/**
 * GET /same-name-diff-context
 */
export async function getSameNameDiffContext(args?: { options?: ClientRequestOptions }) {
  return await client['same-name-diff-context']['$get'](args)
}
