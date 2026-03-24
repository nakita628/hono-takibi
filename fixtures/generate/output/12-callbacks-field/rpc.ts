import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await client.orders.$post(args, options)
}

export async function postPayments(
  args: InferRequestType<typeof client.payments.$post>,
  options?: ClientRequestOptions,
) {
  return await client.payments.$post(args, options)
}

export async function getItems(options?: ClientRequestOptions) {
  return await client.items.$get(undefined, options)
}
