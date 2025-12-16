import { client } from '../index.ts'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export async function getPassthrough() {
  return await client.passthrough.$get()
}
