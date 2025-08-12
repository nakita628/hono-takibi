import { client } from '../index.ts'

/**
 * POST /hono
 */
export async function postHono(body: any) {
  return await client.hono.$post({ json: body })
}
