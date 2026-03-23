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
 * Key prefix for /additional-props
 */
export function getAdditionalPropsKey() {
  return ['additional-props'] as const
}

/**
 * Key prefix for /composed
 */
export function getComposedKey() {
  return ['composed'] as const
}

/**
 * Key prefix for /deep-nested
 */
export function getDeepNestedKey() {
  return ['deep-nested'] as const
}

/**
 * Key prefix for /discriminated
 */
export function getDiscriminatedKey() {
  return ['discriminated'] as const
}

/**
 * Key prefix for /nullable
 */
export function getNullableKey() {
  return ['nullable'] as const
}

/**
 * POST /nullable
 */
export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

/**
 * POST /nullable
 */
export function usePostNullable(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postNullable>>,
    Error,
    Key,
    InferRequestType<typeof client.nullable.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['nullable', '/nullable'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.nullable.$post> }) =>
        postNullable(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * POST /discriminated
 */
export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

/**
 * POST /discriminated
 */
export function usePostDiscriminated(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postDiscriminated>>,
    Error,
    Key,
    InferRequestType<typeof client.discriminated.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['discriminated', '/discriminated'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.discriminated.$post> }) =>
        postDiscriminated(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * GET /composed query key
 */
export function getGetComposedKey() {
  return ['composed', '/composed'] as const
}

/**
 * GET /composed
 */
export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

/**
 * GET /composed
 */
export function useGetComposed(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComposedKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getComposed(clientOptions), restSwrOptions) }
}

/**
 * GET /composed
 */
export function useImmutableGetComposed(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComposedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getComposed(clientOptions), restSwrOptions),
  }
}

/**
 * GET /composed infinite query key
 */
export function getGetComposedInfiniteKey() {
  return ['composed', '/composed', 'infinite'] as const
}

/**
 * GET /composed
 */
export function useInfiniteGetComposed(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getComposed>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetComposedInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getComposed(clientOptions), restSwrOptions)
}

/**
 * GET /deep-nested query key
 */
export function getGetDeepNestedKey() {
  return ['deep-nested', '/deep-nested'] as const
}

/**
 * GET /deep-nested
 */
export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

/**
 * GET /deep-nested
 */
export function useGetDeepNested(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetDeepNestedKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getDeepNested(clientOptions), restSwrOptions) }
}

/**
 * GET /deep-nested
 */
export function useImmutableGetDeepNested(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetDeepNestedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getDeepNested(clientOptions), restSwrOptions),
  }
}

/**
 * GET /deep-nested infinite query key
 */
export function getGetDeepNestedInfiniteKey() {
  return ['deep-nested', '/deep-nested', 'infinite'] as const
}

/**
 * GET /deep-nested
 */
export function useInfiniteGetDeepNested(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getDeepNested>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetDeepNestedInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getDeepNested(clientOptions), restSwrOptions)
}

/**
 * GET /additional-props query key
 */
export function getGetAdditionalPropsKey() {
  return ['additional-props', '/additional-props'] as const
}

/**
 * GET /additional-props
 */
export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

/**
 * GET /additional-props
 */
export function useGetAdditionalProps(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAdditionalPropsKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getAdditionalProps(clientOptions), restSwrOptions),
  }
}

/**
 * GET /additional-props
 */
export function useImmutableGetAdditionalProps(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAdditionalPropsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getAdditionalProps(clientOptions), restSwrOptions),
  }
}

/**
 * GET /additional-props infinite query key
 */
export function getGetAdditionalPropsInfiniteKey() {
  return ['additional-props', '/additional-props', 'infinite'] as const
}

/**
 * GET /additional-props
 */
export function useInfiniteGetAdditionalProps(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getAdditionalProps>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetAdditionalPropsInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getAdditionalProps(clientOptions), restSwrOptions)
}
