import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/test'

/**
 * GET /hono
 *
 * Hono
 *
 * Hono
 */
export async function getHono(args?: { options?: ClientRequestOptions }) {
  return await client.hono.$get(args)
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * HonoX
 */
export async function getHonoX(args?: { options?: ClientRequestOptions }) {
  return await client['hono-x']['$get'](args)
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 */
export async function getZodOpenapiHono(args?: { options?: ClientRequestOptions }) {
  return await client['zod-openapi-hono']['$get'](args)
}
