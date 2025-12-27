import { client } from '../index.ts'

/**
 * GET /items
 */
export async function getItems(params: { query: { page: number; limit: number; sort: string } }) {
  return await client.items.$get({ query: params.query })
}

/**
 * GET /items/{itemId}
 */
export async function getItemsItemId(params: { path: { itemId: string } }) {
  return await client.items[':itemId'].$get({ param: params.path })
}

/**
 * DELETE /items/{itemId}
 */
export async function deleteItemsItemId(params: { path: { itemId: string } }) {
  return await client.items[':itemId'].$delete({ param: params.path })
}
