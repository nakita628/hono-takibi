/**
 * Generated RPC client functions with parseResponse: true
 *
 * This file demonstrates what hono-takibi generates when using:
 * ```ts
 * rpc: {
 *   output: 'src/generated-rpc.ts',
 *   import: './client',
 *   parseResponse: true,
 * }
 * ```
 */
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * GET /json
 */
export async function getJson(options?: ClientRequestOptions) {
  return await parseResponse(client.json.$get(undefined, options))
}

/**
 * GET /json-array
 */
export async function getJsonArray(options?: ClientRequestOptions) {
  return await parseResponse(client['json-array'].$get(undefined, options))
}

/**
 * GET /text
 */
export async function getText(options?: ClientRequestOptions) {
  return await parseResponse(client.text.$get(undefined, options))
}

/**
 * GET /empty
 */
export async function getEmpty(options?: ClientRequestOptions) {
  return await parseResponse(client.empty.$get(undefined, options))
}

/**
 * GET /error-400
 */
export async function getError400(options?: ClientRequestOptions) {
  return await parseResponse(client['error-400'].$get(undefined, options))
}

/**
 * GET /error-404
 */
export async function getError404(options?: ClientRequestOptions) {
  return await parseResponse(client['error-404'].$get(undefined, options))
}

/**
 * GET /error-500
 */
export async function getError500(options?: ClientRequestOptions) {
  return await parseResponse(client['error-500'].$get(undefined, options))
}

/**
 * POST /create
 */
export async function postCreate(
  args: InferRequestType<typeof client.create.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.create.$post(args, options))
}

/**
 * PUT /update/{id}
 */
export async function putUpdateId(
  args: InferRequestType<(typeof client.update)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.update[':id'].$put(args, options))
}

/**
 * DELETE /delete/{id}
 */
export async function deleteDeleteId(
  args: InferRequestType<(typeof client.delete)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.delete[':id'].$delete(args, options))
}

/**
 * GET /headers
 */
export async function getHeaders(options?: ClientRequestOptions) {
  return await parseResponse(client.headers.$get(undefined, options))
}

/**
 * GET /nested
 */
export async function getNested(options?: ClientRequestOptions) {
  return await parseResponse(client.nested.$get(undefined, options))
}
