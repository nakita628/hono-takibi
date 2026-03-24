import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getAllOfKey() {
  return ['all-of'] as const
}

export function getAllOfSiblingKey() {
  return ['all-of-sibling'] as const
}

export function getAnyOfKey() {
  return ['any-of'] as const
}

export function getAnyOfRefKey() {
  return ['any-of-ref'] as const
}

export function getAnyOfThreeKey() {
  return ['any-of-three'] as const
}

export function getNotKey() {
  return ['not'] as const
}

export function getNotCompositionKey() {
  return ['not-composition'] as const
}

export function getNotConstKey() {
  return ['not-const'] as const
}

export function getNotEnumKey() {
  return ['not-enum'] as const
}

export function getNotRefKey() {
  return ['not-ref'] as const
}

export function getNullableOneOfKey() {
  return ['nullable-one-of'] as const
}

export function getOneOfKey() {
  return ['one-of'] as const
}

export async function postOneOf(
  args: InferRequestType<(typeof client)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['one-of'].$post(args, options))
}

export function usePostOneOf(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postOneOf>>,
    Error,
    Key,
    InferRequestType<(typeof client)['one-of']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['one-of', '/one-of', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['one-of']['$post']> }) =>
        postOneOf(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

export function usePostAnyOf(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postAnyOf>>,
    Error,
    Key,
    InferRequestType<(typeof client)['any-of']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['any-of', '/any-of', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['any-of']['$post']> }) =>
        postAnyOf(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

export function usePostAllOf(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postAllOf>>,
    Error,
    Key,
    InferRequestType<(typeof client)['all-of']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['all-of', '/all-of', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['all-of']['$post']> }) =>
        postAllOf(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

export function usePostNot(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postNot>>,
    Error,
    Key,
    InferRequestType<typeof client.not.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['not', '/not', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.not.$post> }) =>
        postNot(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetNotRefKey() {
  return ['not-ref', '/not-ref'] as const
}

export async function getNotRef(options?: ClientRequestOptions) {
  return await parseResponse(client['not-ref'].$get(undefined, options))
}

export function useGetNotRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotRefKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotRef(clientOptions), restSwrOptions) }
}

export function useImmutableGetNotRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotRefKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getNotRef(clientOptions), restSwrOptions),
  }
}

export function getGetNotRefInfiniteKey() {
  return ['not-ref', '/not-ref', 'infinite'] as const
}

export function useInfiniteGetNotRef(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNotRef>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetNotRefInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getNotRef(clientOptions), restSwrOptions)
}

export function getGetNotEnumKey() {
  return ['not-enum', '/not-enum'] as const
}

export async function getNotEnum(options?: ClientRequestOptions) {
  return await parseResponse(client['not-enum'].$get(undefined, options))
}

export function useGetNotEnum(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotEnumKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotEnum(clientOptions), restSwrOptions) }
}

export function useImmutableGetNotEnum(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotEnumKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getNotEnum(clientOptions), restSwrOptions),
  }
}

export function getGetNotEnumInfiniteKey() {
  return ['not-enum', '/not-enum', 'infinite'] as const
}

export function useInfiniteGetNotEnum(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNotEnum>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetNotEnumInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getNotEnum(clientOptions), restSwrOptions)
}

export function getGetNotConstKey() {
  return ['not-const', '/not-const'] as const
}

export async function getNotConst(options?: ClientRequestOptions) {
  return await parseResponse(client['not-const'].$get(undefined, options))
}

export function useGetNotConst(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotConstKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotConst(clientOptions), restSwrOptions) }
}

export function useImmutableGetNotConst(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotConstKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getNotConst(clientOptions), restSwrOptions),
  }
}

export function getGetNotConstInfiniteKey() {
  return ['not-const', '/not-const', 'infinite'] as const
}

export function useInfiniteGetNotConst(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNotConst>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetNotConstInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getNotConst(clientOptions), restSwrOptions)
}

export function getGetNotCompositionKey() {
  return ['not-composition', '/not-composition'] as const
}

export async function getNotComposition(options?: ClientRequestOptions) {
  return await parseResponse(client['not-composition'].$get(undefined, options))
}

export function useGetNotComposition(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotCompositionKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotComposition(clientOptions), restSwrOptions) }
}

export function useImmutableGetNotComposition(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotCompositionKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getNotComposition(clientOptions), restSwrOptions),
  }
}

export function getGetNotCompositionInfiniteKey() {
  return ['not-composition', '/not-composition', 'infinite'] as const
}

export function useInfiniteGetNotComposition(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNotComposition>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetNotCompositionInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getNotComposition(clientOptions), restSwrOptions)
}

export function getGetAllOfSiblingKey() {
  return ['all-of-sibling', '/all-of-sibling'] as const
}

export async function getAllOfSibling(options?: ClientRequestOptions) {
  return await parseResponse(client['all-of-sibling'].$get(undefined, options))
}

export function useGetAllOfSibling(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAllOfSiblingKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getAllOfSibling(clientOptions), restSwrOptions) }
}

export function useImmutableGetAllOfSibling(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAllOfSiblingKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getAllOfSibling(clientOptions), restSwrOptions),
  }
}

export function getGetAllOfSiblingInfiniteKey() {
  return ['all-of-sibling', '/all-of-sibling', 'infinite'] as const
}

export function useInfiniteGetAllOfSibling(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getAllOfSibling>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetAllOfSiblingInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getAllOfSibling(clientOptions), restSwrOptions)
}

export function getGetNullableOneOfKey() {
  return ['nullable-one-of', '/nullable-one-of'] as const
}

export async function getNullableOneOf(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-one-of'].$get(undefined, options))
}

export function useGetNullableOneOf(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNullableOneOfKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNullableOneOf(clientOptions), restSwrOptions) }
}

export function useImmutableGetNullableOneOf(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNullableOneOfKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getNullableOneOf(clientOptions), restSwrOptions),
  }
}

export function getGetNullableOneOfInfiniteKey() {
  return ['nullable-one-of', '/nullable-one-of', 'infinite'] as const
}

export function useInfiniteGetNullableOneOf(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNullableOneOf>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetNullableOneOfInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getNullableOneOf(clientOptions), restSwrOptions)
}

export function getGetAnyOfThreeKey() {
  return ['any-of-three', '/any-of-three'] as const
}

export async function getAnyOfThree(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-three'].$get(undefined, options))
}

export function useGetAnyOfThree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAnyOfThreeKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getAnyOfThree(clientOptions), restSwrOptions) }
}

export function useImmutableGetAnyOfThree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAnyOfThreeKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getAnyOfThree(clientOptions), restSwrOptions),
  }
}

export function getGetAnyOfThreeInfiniteKey() {
  return ['any-of-three', '/any-of-three', 'infinite'] as const
}

export function useInfiniteGetAnyOfThree(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getAnyOfThree>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetAnyOfThreeInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getAnyOfThree(clientOptions), restSwrOptions)
}

export function getGetAnyOfRefKey() {
  return ['any-of-ref', '/any-of-ref'] as const
}

export async function getAnyOfRef(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-ref'].$get(undefined, options))
}

export function useGetAnyOfRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAnyOfRefKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getAnyOfRef(clientOptions), restSwrOptions) }
}

export function useImmutableGetAnyOfRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAnyOfRefKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getAnyOfRef(clientOptions), restSwrOptions),
  }
}

export function getGetAnyOfRefInfiniteKey() {
  return ['any-of-ref', '/any-of-ref', 'infinite'] as const
}

export function useInfiniteGetAnyOfRef(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getAnyOfRef>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetAnyOfRefInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getAnyOfRef(clientOptions), restSwrOptions)
}
