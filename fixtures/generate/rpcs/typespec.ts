import { client } from '../index.ts'

/**
 * POST /hono
 */
export async function postHono(body: { hono: 'Hono' | 'HonoX' | 'ZodOpenAPIHono' }) {
  return await client.hono.$post({ json: body })
}
