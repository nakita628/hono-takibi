import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}
