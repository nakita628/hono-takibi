import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export async function getResources(
  args: InferRequestType<typeof client.resources.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.resources.$get(args, options))
}

/**
 * GET /resources/{id}
 */
export async function getResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.resources[':id'].$get(args, options))
}

/**
 * PUT /resources/{id}
 */
export async function putResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.resources[':id'].$put(args, options))
}

/**
 * GET /download/{id}
 */
export async function getDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.download[':id'].$get(args, options))
}
