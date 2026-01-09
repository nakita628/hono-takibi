import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export async function getExtremeResponses(options?: ClientRequestOptions) {
  return await client['extreme-responses'].$get(undefined, options)
}

/**
 * POST /multipart-variations
 */
export async function postMultipartVariations(
  args: {
    form: { file?: File; metadata?: string } | { field1?: string; field2?: string[] }
    json:
      | { parts?: File[] }
      | { root?: string; attachments?: File[] }
      | { text?: string; html?: string }
      | {}
      | {}
      | {}
  },
  options?: ClientRequestOptions,
) {
  return await client['multipart-variations'].$post(args, options)
}

/**
 * POST /charset-variations
 */
export async function postCharsetVariations(
  args: { form: {}; json: {} | {} | {} | string | string | string },
  options?: ClientRequestOptions,
) {
  return await client['charset-variations'].$post(args, options)
}
