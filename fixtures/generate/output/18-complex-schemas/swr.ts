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
 * Key prefix for /configs
 */
export function getConfigsKey() {
  return ['configs'] as const
}

/**
 * Key prefix for /documents
 */
export function getDocumentsKey() {
  return ['documents'] as const
}

/**
 * Key prefix for /expressions
 */
export function getExpressionsKey() {
  return ['expressions'] as const
}

/**
 * Key prefix for /nested-circular
 */
export function getNestedCircularKey() {
  return ['nested-circular'] as const
}

/**
 * Key prefix for /nullable-union
 */
export function getNullableUnionKey() {
  return ['nullable-union'] as const
}

/**
 * Key prefix for /shapes
 */
export function getShapesKey() {
  return ['shapes'] as const
}

/**
 * POST /expressions
 *
 * Circular reference with oneOf (expression tree)
 */
export async function postExpressions(
  args: InferRequestType<typeof client.expressions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.expressions.$post(args, options))
}

/**
 * POST /expressions
 *
 * Circular reference with oneOf (expression tree)
 */
export function usePostExpressions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postExpressions>>,
    Error,
    Key,
    InferRequestType<typeof client.expressions.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['expressions', '/expressions'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.expressions.$post> }) =>
        postExpressions(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * POST /shapes
 *
 * 5-variant discriminated union
 */
export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.shapes.$post(args, options))
}

/**
 * POST /shapes
 *
 * 5-variant discriminated union
 */
export function usePostShapes(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postShapes>>,
    Error,
    Key,
    InferRequestType<typeof client.shapes.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['shapes', '/shapes'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.shapes.$post> }) =>
        postShapes(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * POST /documents
 *
 * allOf inside oneOf (nested composition)
 */
export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$post(args, options))
}

/**
 * POST /documents
 *
 * allOf inside oneOf (nested composition)
 */
export function usePostDocuments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postDocuments>>,
    Error,
    Key,
    InferRequestType<typeof client.documents.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['documents', '/documents'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
        postDocuments(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * POST /configs
 *
 * Deeply nested allOf chain
 */
export async function postConfigs(
  args: InferRequestType<typeof client.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.configs.$post(args, options))
}

/**
 * POST /configs
 *
 * Deeply nested allOf chain
 */
export function usePostConfigs(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postConfigs>>,
    Error,
    Key,
    InferRequestType<typeof client.configs.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['configs', '/configs'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.configs.$post> }) =>
        postConfigs(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * GET /nullable-union query key
 */
export function getGetNullableUnionKey() {
  return ['nullable-union', '/nullable-union'] as const
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export async function getNullableUnion(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-union'].$get(undefined, options))
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useGetNullableUnion(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNullableUnionKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNullableUnion(clientOptions), restSwrOptions) }
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useImmutableGetNullableUnion(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNullableUnionKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getNullableUnion(clientOptions), restSwrOptions),
  }
}

/**
 * GET /nullable-union infinite query key
 */
export function getGetNullableUnionInfiniteKey() {
  return ['nullable-union', '/nullable-union', 'infinite'] as const
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useInfiniteGetNullableUnion(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNullableUnion>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetNullableUnionInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getNullableUnion(clientOptions), restSwrOptions)
}

/**
 * GET /nested-circular query key
 */
export function getGetNestedCircularKey() {
  return ['nested-circular', '/nested-circular'] as const
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export async function getNestedCircular(options?: ClientRequestOptions) {
  return await parseResponse(client['nested-circular'].$get(undefined, options))
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useGetNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNestedCircularKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNestedCircular(clientOptions), restSwrOptions) }
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useImmutableGetNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNestedCircularKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getNestedCircular(clientOptions), restSwrOptions),
  }
}

/**
 * GET /nested-circular infinite query key
 */
export function getGetNestedCircularInfiniteKey() {
  return ['nested-circular', '/nested-circular', 'infinite'] as const
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useInfiniteGetNestedCircular(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNestedCircular>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetNestedCircularInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getNestedCircular(clientOptions), restSwrOptions)
}
