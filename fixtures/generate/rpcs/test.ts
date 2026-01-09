import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/test'

/**
 * GET /hono
 *
 * Hono
 *
 * Hono
 */
export async function getHono(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.hono.$get(args, options)
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * HonoX
 */
export async function getHonoX(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['hono-x']['$get'](args, options)
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 */
export async function getZodOpenapiHono(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['zod-openapi-hono']['$get'](args, options)
}
