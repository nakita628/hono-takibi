import { client } from '../index.ts'

/**
 * Hono
 *
 * Hono
 *
 * GET /hono
 */
export async function getHono() {
  return await client.hono.$get()
}

/**
 * HonoX
 *
 * HonoX
 *
 * GET /hono-x
 */
export async function getHonoX() {
  return (await client.hono) - x.$get()
}

/**
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 *
 * GET /zod-openapi-hono
 */
export async function getZodOpenapiHono() {
  return (await client.zod) - openapi - hono.$get()
}
