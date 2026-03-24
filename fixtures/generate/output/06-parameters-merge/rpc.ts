import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':itemId'].$get(args, options)
}

export async function putItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':itemId'].$put(args, options)
}

export async function deleteItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':itemId'].$delete(args, options)
}

export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.items.$get(args, options)
}
