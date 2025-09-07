import { client } from '../client'

/**
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 *
 * GET /zod-openapi-hono
 */
export async function getZodOpenapiHono() {
  return await client['zod-openapi-hono'].$get()
}
