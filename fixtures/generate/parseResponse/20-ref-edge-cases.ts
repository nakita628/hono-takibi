import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export async function getTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.test.$get(args, options))
}

/**
 * GET /empty-refs
 */
export async function getEmptyRefs(options?: ClientRequestOptions) {
  return await parseResponse(client['empty-refs'].$get(undefined, options))
}

/**
 * GET /unicode-refs
 */
export async function getUnicodeRefs(options?: ClientRequestOptions) {
  return await parseResponse(client['unicode-refs'].$get(undefined, options))
}

/**
 * GET /special-chars
 */
export async function getSpecialChars(options?: ClientRequestOptions) {
  return await parseResponse(client['special-chars'].$get(undefined, options))
}

/**
 * GET /numeric-start
 */
export async function getNumericStart(options?: ClientRequestOptions) {
  return await parseResponse(client['numeric-start'].$get(undefined, options))
}

/**
 * GET /ref-in-allof
 */
export async function getRefInAllof(options?: ClientRequestOptions) {
  return await parseResponse(client['ref-in-allof'].$get(undefined, options))
}

/**
 * GET /deeply-nested
 */
export async function getDeeplyNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deeply-nested'].$get(undefined, options))
}

/**
 * GET /same-name-diff-context
 */
export async function getSameNameDiffContext(options?: ClientRequestOptions) {
  return await parseResponse(client['same-name-diff-context'].$get(undefined, options))
}
