import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export async function getItems(arg: { query: { page?: number; limit?: number; sort?: string } }) {
  return await client.items.$get(arg)
}

/**
 * GET /items/{itemId}
 */
export async function getItemsItemId(arg: { param: { itemId: string } }) {
  return await client['items'][':itemId']['$get'](arg)
}

/**
 * DELETE /items/{itemId}
 */
export async function deleteItemsItemId(arg: {
  param: { itemId: string }
  header: { 'If-Match'?: string }
}) {
  return await client['items'][':itemId']['$delete'](arg)
}
