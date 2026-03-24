import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}

export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$get(args, options)
}

export async function putUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$put(args, options)
}

export async function deleteUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$delete(args, options)
}

export async function getProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return await client.products.$get(args, options)
}

export async function postProducts(
  args: InferRequestType<typeof client.products.$post>,
  options?: ClientRequestOptions,
) {
  return await client.products.$post(args, options)
}

export async function getProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$get(args, options)
}

export async function putProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$put(args, options)
}

export async function getProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].reviews.$get(args, options)
}

export async function postProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].reviews.$post(args, options)
}

export async function getOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return await client.orders.$get(args, options)
}

export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await client.orders.$post(args, options)
}

export async function getOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.orders[':orderId'].$get(args, options)
}

export async function getCategories(options?: ClientRequestOptions) {
  return await client.categories.$get(undefined, options)
}

export async function postUploadImage(
  args: InferRequestType<typeof client.upload.image.$post>,
  options?: ClientRequestOptions,
) {
  return await client.upload.image.$post(args, options)
}
