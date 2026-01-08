import type { InferRequestType } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export async function getItems(arg: InferRequestType<typeof client.items.$get>) {
  return await client.items.$get(arg)
}

/**
 * GET /items/{itemId}
 */
export async function getItemsItemId(
  arg: InferRequestType<(typeof client)['items'][':itemId']['$get']>,
) {
  return await client['items'][':itemId']['$get'](arg)
}

/**
 * DELETE /items/{itemId}
 */
export async function deleteItemsItemId(
  arg: InferRequestType<(typeof client)['items'][':itemId']['$delete']>,
) {
  return await client['items'][':itemId']['$delete'](arg)
}
