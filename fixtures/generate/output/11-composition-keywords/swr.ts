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

/**
 * Generates SWR mutation key for POST /one-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOneOfMutationKey() {
  return ['one-of', 'POST', '/one-of'] as const
}

/**
 * POST /one-of
 */
export async function postOneOf(
  args: InferRequestType<(typeof client)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['one-of'].$post(args, options))
}

/**
 * POST /one-of
 */
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
  const swrKey = customKey ?? getPostOneOfMutationKey()
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

/**
 * Generates SWR mutation key for POST /any-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAnyOfMutationKey() {
  return ['any-of', 'POST', '/any-of'] as const
}

/**
 * POST /any-of
 */
export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

/**
 * POST /any-of
 */
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
  const swrKey = customKey ?? getPostAnyOfMutationKey()
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

/**
 * Generates SWR mutation key for POST /all-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAllOfMutationKey() {
  return ['all-of', 'POST', '/all-of'] as const
}

/**
 * POST /all-of
 */
export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

/**
 * POST /all-of
 */
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
  const swrKey = customKey ?? getPostAllOfMutationKey()
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

/**
 * Generates SWR mutation key for POST /not
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotMutationKey() {
  return ['not', 'POST', '/not'] as const
}

/**
 * POST /not
 */
export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

/**
 * POST /not
 */
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
  const swrKey = customKey ?? getPostNotMutationKey()
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

/**
 * Generates SWR cache key for GET /not-ref
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotRefKey() {
  return ['not-ref', 'GET', '/not-ref'] as const
}

/**
 * GET /not-ref
 */
export async function getNotRef(options?: ClientRequestOptions) {
  return await parseResponse(client['not-ref'].$get(undefined, options))
}

/**
 * GET /not-ref
 */
export function useGetNotRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotRefKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotRef(clientOptions), restSwrOptions) }
}

/**
 * GET /not-ref
 */
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

/**
 * Generates SWR infinite query cache key for GET /not-ref
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotRefInfiniteKey() {
  return ['not-ref', 'GET', '/not-ref', 'infinite'] as const
}

/**
 * GET /not-ref
 */
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

/**
 * Generates SWR cache key for GET /not-enum
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotEnumKey() {
  return ['not-enum', 'GET', '/not-enum'] as const
}

/**
 * GET /not-enum
 */
export async function getNotEnum(options?: ClientRequestOptions) {
  return await parseResponse(client['not-enum'].$get(undefined, options))
}

/**
 * GET /not-enum
 */
export function useGetNotEnum(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotEnumKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotEnum(clientOptions), restSwrOptions) }
}

/**
 * GET /not-enum
 */
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

/**
 * Generates SWR infinite query cache key for GET /not-enum
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotEnumInfiniteKey() {
  return ['not-enum', 'GET', '/not-enum', 'infinite'] as const
}

/**
 * GET /not-enum
 */
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

/**
 * Generates SWR cache key for GET /not-const
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotConstKey() {
  return ['not-const', 'GET', '/not-const'] as const
}

/**
 * GET /not-const
 */
export async function getNotConst(options?: ClientRequestOptions) {
  return await parseResponse(client['not-const'].$get(undefined, options))
}

/**
 * GET /not-const
 */
export function useGetNotConst(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotConstKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotConst(clientOptions), restSwrOptions) }
}

/**
 * GET /not-const
 */
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

/**
 * Generates SWR infinite query cache key for GET /not-const
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotConstInfiniteKey() {
  return ['not-const', 'GET', '/not-const', 'infinite'] as const
}

/**
 * GET /not-const
 */
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

/**
 * Generates SWR cache key for GET /not-composition
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotCompositionKey() {
  return ['not-composition', 'GET', '/not-composition'] as const
}

/**
 * GET /not-composition
 */
export async function getNotComposition(options?: ClientRequestOptions) {
  return await parseResponse(client['not-composition'].$get(undefined, options))
}

/**
 * GET /not-composition
 */
export function useGetNotComposition(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotCompositionKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNotComposition(clientOptions), restSwrOptions) }
}

/**
 * GET /not-composition
 */
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

/**
 * Generates SWR infinite query cache key for GET /not-composition
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotCompositionInfiniteKey() {
  return ['not-composition', 'GET', '/not-composition', 'infinite'] as const
}

/**
 * GET /not-composition
 */
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

/**
 * Generates SWR cache key for GET /all-of-sibling
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAllOfSiblingKey() {
  return ['all-of-sibling', 'GET', '/all-of-sibling'] as const
}

/**
 * GET /all-of-sibling
 */
export async function getAllOfSibling(options?: ClientRequestOptions) {
  return await parseResponse(client['all-of-sibling'].$get(undefined, options))
}

/**
 * GET /all-of-sibling
 */
export function useGetAllOfSibling(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAllOfSiblingKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getAllOfSibling(clientOptions), restSwrOptions) }
}

/**
 * GET /all-of-sibling
 */
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

/**
 * Generates SWR infinite query cache key for GET /all-of-sibling
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAllOfSiblingInfiniteKey() {
  return ['all-of-sibling', 'GET', '/all-of-sibling', 'infinite'] as const
}

/**
 * GET /all-of-sibling
 */
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

/**
 * Generates SWR cache key for GET /nullable-one-of
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableOneOfKey() {
  return ['nullable-one-of', 'GET', '/nullable-one-of'] as const
}

/**
 * GET /nullable-one-of
 */
export async function getNullableOneOf(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-one-of'].$get(undefined, options))
}

/**
 * GET /nullable-one-of
 */
export function useGetNullableOneOf(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNullableOneOfKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNullableOneOf(clientOptions), restSwrOptions) }
}

/**
 * GET /nullable-one-of
 */
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

/**
 * Generates SWR infinite query cache key for GET /nullable-one-of
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNullableOneOfInfiniteKey() {
  return ['nullable-one-of', 'GET', '/nullable-one-of', 'infinite'] as const
}

/**
 * GET /nullable-one-of
 */
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

/**
 * Generates SWR cache key for GET /any-of-three
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyOfThreeKey() {
  return ['any-of-three', 'GET', '/any-of-three'] as const
}

/**
 * GET /any-of-three
 */
export async function getAnyOfThree(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-three'].$get(undefined, options))
}

/**
 * GET /any-of-three
 */
export function useGetAnyOfThree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAnyOfThreeKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getAnyOfThree(clientOptions), restSwrOptions) }
}

/**
 * GET /any-of-three
 */
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

/**
 * Generates SWR infinite query cache key for GET /any-of-three
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAnyOfThreeInfiniteKey() {
  return ['any-of-three', 'GET', '/any-of-three', 'infinite'] as const
}

/**
 * GET /any-of-three
 */
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

/**
 * Generates SWR cache key for GET /any-of-ref
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyOfRefKey() {
  return ['any-of-ref', 'GET', '/any-of-ref'] as const
}

/**
 * GET /any-of-ref
 */
export async function getAnyOfRef(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-ref'].$get(undefined, options))
}

/**
 * GET /any-of-ref
 */
export function useGetAnyOfRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAnyOfRefKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getAnyOfRef(clientOptions), restSwrOptions) }
}

/**
 * GET /any-of-ref
 */
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

/**
 * Generates SWR infinite query cache key for GET /any-of-ref
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAnyOfRefInfiniteKey() {
  return ['any-of-ref', 'GET', '/any-of-ref', 'infinite'] as const
}

/**
 * GET /any-of-ref
 */
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
