import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getTags(options?: ClientRequestOptions) {
  return await client.tags.$get(undefined, options)
}

export async function postTags(
  args: InferRequestType<typeof client.tags.$post>,
  options?: ClientRequestOptions,
) {
  return await client.tags.$post(args, options)
}

export async function getSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return await client.settings.$get(args, options)
}

export async function putSettings(
  args: InferRequestType<typeof client.settings.$put>,
  options?: ClientRequestOptions,
) {
  return await client.settings.$put(args, options)
}

export async function postConfig(
  args: InferRequestType<typeof client.config.$post>,
  options?: ClientRequestOptions,
) {
  return await client.config.$post(args, options)
}

export async function postPayment(
  args: InferRequestType<typeof client.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await client.payment.$post(args, options)
}
