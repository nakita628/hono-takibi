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

export function getAdditionalPropsKey() {
  return ['additional-props'] as const
}

export function getComposedKey() {
  return ['composed'] as const
}

export function getDeepNestedKey() {
  return ['deep-nested'] as const
}

export function getDiscriminatedKey() {
  return ['discriminated'] as const
}

export function getNullableKey() {
  return ['nullable'] as const
}

export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

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
  const swrKey = customKey ?? (['nullable', '/nullable', 'POST'] as const)
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

export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

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
  const swrKey = customKey ?? (['discriminated', '/discriminated', 'POST'] as const)
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

export function getGetComposedKey() {
  return ['composed', '/composed'] as const
}

export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

export function useGetComposed(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComposedKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getComposed(clientOptions), restSwrOptions) }
}

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

export function getGetComposedInfiniteKey() {
  return ['composed', '/composed', 'infinite'] as const
}

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

export function getGetDeepNestedKey() {
  return ['deep-nested', '/deep-nested'] as const
}

export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

export function useGetDeepNested(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetDeepNestedKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getDeepNested(clientOptions), restSwrOptions) }
}

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

export function getGetDeepNestedInfiniteKey() {
  return ['deep-nested', '/deep-nested', 'infinite'] as const
}

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

export function getGetAdditionalPropsKey() {
  return ['additional-props', '/additional-props'] as const
}

export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

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

export function getGetAdditionalPropsInfiniteKey() {
  return ['additional-props', '/additional-props', 'infinite'] as const
}

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
