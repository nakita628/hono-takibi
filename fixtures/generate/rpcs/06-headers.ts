import type { InferRequestType } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export async function getResources() {
  return await client.resources.$get()
}

/**
 * GET /resources/{id}
 */
export async function getResourcesId(
  arg: InferRequestType<(typeof client)['resources'][':id']['$get']>,
) {
  return await client['resources'][':id']['$get'](arg)
}

/**
 * PUT /resources/{id}
 */
export async function putResourcesId(
  arg: InferRequestType<(typeof client)['resources'][':id']['$put']>,
) {
  return await client['resources'][':id']['$put'](arg)
}

/**
 * GET /download/{id}
 */
export async function getDownloadId(
  arg: InferRequestType<(typeof client)['download'][':id']['$get']>,
) {
  return await client['download'][':id']['$get'](arg)
}
