import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export async function getItems(args: {
  query: { page?: number; limit?: number; sort?: string }
  options?: ClientRequestOptions
}) {
  return await client.items.$get(args)
}

/**
 * GET /items/{itemId}
 */
export async function getItemsItemId(args: {
  param: { itemId: string }
  options?: ClientRequestOptions
}) {
  return await client['items'][':itemId']['$get'](args)
}

/**
 * DELETE /items/{itemId}
 */
export async function deleteItemsItemId(args: {
  param: { itemId: string }
  header: { 'If-Match'?: string }
  options?: ClientRequestOptions
}) {
  return await client['items'][':itemId']['$delete'](args)
}
