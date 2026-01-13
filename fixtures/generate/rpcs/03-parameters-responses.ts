import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.items.$get(args, options)
}

/**
 * GET /items/{itemId}
 */
export async function getItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':itemId'].$get(args, options)
}

/**
 * DELETE /items/{itemId}
 */
export async function deleteItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':itemId'].$delete(args, options)
}
