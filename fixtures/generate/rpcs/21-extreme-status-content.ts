import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export async function getExtremeResponses() {
  return await client['extreme-responses']['$get']()
}

/**
 * POST /multipart-variations
 */
export async function postMultipartVariations(arg: {
  form: { file?: File; metadata?: string } | { field1?: string; field2?: string[] }
  json:
    | { parts?: File[] }
    | { root?: string; attachments?: File[] }
    | { text?: string; html?: string }
    | {}
    | {}
    | {}
}) {
  return await client['multipart-variations']['$post'](arg)
}

/**
 * POST /charset-variations
 */
export async function postCharsetVariations(arg: {
  json: {} | {} | {} | string | string | string | {}
}) {
  return await client['charset-variations']['$post'](arg)
}
