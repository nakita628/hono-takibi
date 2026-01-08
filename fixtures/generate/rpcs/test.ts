import { client } from '../clients/test'

/**
 * GET /hono
 *
 * Hono
 *
 * Hono
 */
export async function getHono() {
  return await client.hono.$get()
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * HonoX
 */
export async function getHonoX() {
  return await client['hono-x'].$get()
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 */
export async function getZodOpenapiHono() {
  return await client['zod-openapi-hono'].$get()
}
