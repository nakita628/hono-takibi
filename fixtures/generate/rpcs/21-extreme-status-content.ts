import { client } from '../index.ts'

/**
 * GET /extreme-responses
 */
export async function getExtremeResponses() {
  return await client['extreme-responses'].$get()
}

/**
 * POST /multipart-variations
 */
export async function postMultipartVariations(body: { field1?: string; field2?: string[] }) {
  return await client['multipart-variations'].$post({ json: body })
}

/**
 * POST /charset-variations
 */
export async function postCharsetVariations() {
  return await client['charset-variations'].$post()
}
