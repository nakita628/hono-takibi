import type { InferRequestType } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export async function postEncodingTest(
  arg: InferRequestType<(typeof client)['encoding-test']['$post']>,
) {
  return await client['encoding-test']['$post'](arg)
}

/**
 * GET /content-negotiation
 */
export async function getContentNegotiation() {
  return await client['content-negotiation']['$get']()
}

/**
 * POST /binary-variations
 */
export async function postBinaryVariations(
  arg: InferRequestType<(typeof client)['binary-variations']['$post']>,
) {
  return await client['binary-variations']['$post'](arg)
}

/**
 * GET /streaming
 */
export async function getStreaming() {
  return await client.streaming.$get()
}

/**
 * POST /streaming
 */
export async function postStreaming(arg: InferRequestType<typeof client.streaming.$post>) {
  return await client.streaming.$post(arg)
}

/**
 * POST /url-encoded-complex
 */
export async function postUrlEncodedComplex(
  arg: InferRequestType<(typeof client)['url-encoded-complex']['$post']>,
) {
  return await client['url-encoded-complex']['$post'](arg)
}

/**
 * GET /response-encoding
 */
export async function getResponseEncoding() {
  return await client['response-encoding']['$get']()
}

/**
 * POST /schema-encoding
 */
export async function postSchemaEncoding(
  arg: InferRequestType<(typeof client)['schema-encoding']['$post']>,
) {
  return await client['schema-encoding']['$post'](arg)
}
