import { client } from '../client'

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono() {
  return await client['zod-openapi-hono'].$get()
}
