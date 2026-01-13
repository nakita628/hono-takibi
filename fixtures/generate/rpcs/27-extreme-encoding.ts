import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export async function postEncodingTest(
  args: InferRequestType<(typeof client)['encoding-test']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['encoding-test'].$post(args, options)
}

/**
 * GET /content-negotiation
 */
export async function getContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['content-negotiation'].$get(args, options)
}

/**
 * POST /binary-variations
 */
export async function postBinaryVariations(
  args: InferRequestType<(typeof client)['binary-variations']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['binary-variations'].$post(args, options)
}

/**
 * GET /streaming
 */
export async function getStreaming(options?: ClientRequestOptions) {
  return await client.streaming.$get(undefined, options)
}

/**
 * POST /streaming
 */
export async function postStreaming(
  args: InferRequestType<typeof client.streaming.$post>,
  options?: ClientRequestOptions,
) {
  return await client.streaming.$post(args, options)
}

/**
 * POST /url-encoded-complex
 */
export async function postUrlEncodedComplex(
  args: InferRequestType<(typeof client)['url-encoded-complex']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['url-encoded-complex'].$post(args, options)
}

/**
 * GET /response-encoding
 */
export async function getResponseEncoding(options?: ClientRequestOptions) {
  return await client['response-encoding'].$get(undefined, options)
}

/**
 * POST /schema-encoding
 */
export async function postSchemaEncoding(
  args: InferRequestType<(typeof client)['schema-encoding']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['schema-encoding'].$post(args, options)
}
