import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function postExpressions(
  args: InferRequestType<typeof client.expressions.$post>,
  options?: ClientRequestOptions,
) {
  return await client.expressions.$post(args, options)
}

export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await client.shapes.$post(args, options)
}

export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await client.documents.$post(args, options)
}

export async function postConfigs(
  args: InferRequestType<typeof client.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await client.configs.$post(args, options)
}

export async function getNullableUnion(options?: ClientRequestOptions) {
  return await client['nullable-union'].$get(undefined, options)
}

export async function getNestedCircular(options?: ClientRequestOptions) {
  return await client['nested-circular'].$get(undefined, options)
}
