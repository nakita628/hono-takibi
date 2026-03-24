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

export function getGraphKey() {
  return ['graph'] as const
}

export function getTreeKey() {
  return ['tree'] as const
}

export function getGetTreeKey() {
  return ['tree', '/tree'] as const
}

export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

export function useGetTree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTreeKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getTree(clientOptions), restSwrOptions) }
}

export function useImmutableGetTree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTreeKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getTree(clientOptions), restSwrOptions) }
}

export function getGetTreeInfiniteKey() {
  return ['tree', '/tree', 'infinite'] as const
}

export function useInfiniteGetTree(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getTree>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetTreeInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getTree(clientOptions), restSwrOptions)
}

export async function postTree(
  args: InferRequestType<typeof client.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tree.$post(args, options))
}

export function usePostTree(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postTree>>,
    Error,
    Key,
    InferRequestType<typeof client.tree.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['tree', '/tree', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.tree.$post> }) =>
        postTree(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetGraphKey() {
  return ['graph', '/graph'] as const
}

export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

export function useGetGraph(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetGraphKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getGraph(clientOptions), restSwrOptions) }
}

export function useImmutableGetGraph(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetGraphKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getGraph(clientOptions), restSwrOptions) }
}

export function getGetGraphInfiniteKey() {
  return ['graph', '/graph', 'infinite'] as const
}

export function useInfiniteGetGraph(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getGraph>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetGraphInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getGraph(clientOptions), restSwrOptions)
}
