import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['zod-openapi-hono'].$get(args, options)
}
