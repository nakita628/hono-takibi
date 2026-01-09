import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export async function getResources(
  args: { header: { 'X-Request-ID'?: string } },
  options?: ClientRequestOptions,
) {
  return await client.resources.$get(args, options)
}

/**
 * GET /resources/{id}
 */
export async function getResourcesId(
  args: { param: { id: string }; header: { 'If-None-Match'?: string } },
  options?: ClientRequestOptions,
) {
  return await client['resources'][':id']['$get'](args, options)
}

/**
 * PUT /resources/{id}
 */
export async function putResourcesId(
  args: {
    param: { id: string }
    header: { 'If-Match': string }
    json: { id?: string; name?: string; data?: {} }
  },
  options?: ClientRequestOptions,
) {
  return await client['resources'][':id']['$put'](args, options)
}

/**
 * GET /download/{id}
 */
export async function getDownloadId(
  args: { param: { id: string } },
  options?: ClientRequestOptions,
) {
  return await client['download'][':id']['$get'](args, options)
}
