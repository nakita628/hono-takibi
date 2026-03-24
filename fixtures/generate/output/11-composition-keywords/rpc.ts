import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function postOneOf(
  args: InferRequestType<(typeof client)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['one-of'].$post(args, options)
}

export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['any-of'].$post(args, options)
}

export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['all-of'].$post(args, options)
}

export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await client.not.$post(args, options)
}

export async function getNotRef(options?: ClientRequestOptions) {
  return await client['not-ref'].$get(undefined, options)
}

export async function getNotEnum(options?: ClientRequestOptions) {
  return await client['not-enum'].$get(undefined, options)
}

export async function getNotConst(options?: ClientRequestOptions) {
  return await client['not-const'].$get(undefined, options)
}

export async function getNotComposition(options?: ClientRequestOptions) {
  return await client['not-composition'].$get(undefined, options)
}

export async function getAllOfSibling(options?: ClientRequestOptions) {
  return await client['all-of-sibling'].$get(undefined, options)
}

export async function getNullableOneOf(options?: ClientRequestOptions) {
  return await client['nullable-one-of'].$get(undefined, options)
}

export async function getAnyOfThree(options?: ClientRequestOptions) {
  return await client['any-of-three'].$get(undefined, options)
}

export async function getAnyOfRef(options?: ClientRequestOptions) {
  return await client['any-of-ref'].$get(undefined, options)
}
