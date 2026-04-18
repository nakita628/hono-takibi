import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function getZodOpenapiHono(options?: ClientRequestOptions) {
  return await client['zod-openapi-hono'].$get(undefined, options)
}
