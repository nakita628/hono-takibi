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

export function getConfigsKey() {
  return ['configs'] as const
}

export function getDocumentsKey() {
  return ['documents'] as const
}

export function getExpressionsKey() {
  return ['expressions'] as const
}

export function getNestedCircularKey() {
  return ['nested-circular'] as const
}

export function getNullableUnionKey() {
  return ['nullable-union'] as const
}

export function getShapesKey() {
  return ['shapes'] as const
}

export async function postExpressions(
  args: InferRequestType<typeof client.expressions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.expressions.$post(args, options))
}

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
  const swrKey = customKey ?? (['expressions', '/expressions', 'POST'] as const)
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

export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.shapes.$post(args, options))
}

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
  const swrKey = customKey ?? (['shapes', '/shapes', 'POST'] as const)
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

export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$post(args, options))
}

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
  const swrKey = customKey ?? (['documents', '/documents', 'POST'] as const)
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

export async function postConfigs(
  args: InferRequestType<typeof client.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.configs.$post(args, options))
}

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
  const swrKey = customKey ?? (['configs', '/configs', 'POST'] as const)
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

export function getGetNullableUnionKey() {
  return ['nullable-union', '/nullable-union'] as const
}

export async function getNullableUnion(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-union'].$get(undefined, options))
}

export function useGetNullableUnion(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNullableUnionKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNullableUnion(clientOptions), restSwrOptions) }
}

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

export function getGetNullableUnionInfiniteKey() {
  return ['nullable-union', '/nullable-union', 'infinite'] as const
}

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

export function getGetNestedCircularKey() {
  return ['nested-circular', '/nested-circular'] as const
}

export async function getNestedCircular(options?: ClientRequestOptions) {
  return await parseResponse(client['nested-circular'].$get(undefined, options))
}

export function useGetNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNestedCircularKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getNestedCircular(clientOptions), restSwrOptions) }
}

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

export function getGetNestedCircularInfiniteKey() {
  return ['nested-circular', '/nested-circular', 'infinite'] as const
}

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
