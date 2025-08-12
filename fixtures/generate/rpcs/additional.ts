import { client } from '../index.ts'

/**
 * zod passthrough
 *
 * zod passthrough
 *
 * GET /passthrough
 */
export async function getPassthrough() {
  return await client.passthrough.$get()
}
