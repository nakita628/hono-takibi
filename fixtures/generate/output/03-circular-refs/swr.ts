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
 * Key prefix for /graph
 */
export function getGraphKey() {
  return ['graph'] as const
}

/**
 * Key prefix for /tree
 */
export function getTreeKey() {
  return ['tree'] as const
}

/**
 * GET /tree query key
 */
export function getGetTreeKey() {
  return ['tree', '/tree'] as const
}

/**
 * GET /tree
 */
export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

/**
 * GET /tree
 */
export function useGetTree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTreeKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getTree(clientOptions), restSwrOptions) }
}

/**
 * GET /tree
 */
export function useImmutableGetTree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTreeKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getTree(clientOptions), restSwrOptions) }
}

/**
 * GET /tree infinite query key
 */
export function getGetTreeInfiniteKey() {
  return ['tree', '/tree', 'infinite'] as const
}

/**
 * GET /tree
 */
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

/**
 * POST /tree
 */
export async function postTree(
  args: InferRequestType<typeof client.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tree.$post(args, options))
}

/**
 * POST /tree
 */
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
  const swrKey = customKey ?? (['tree', '/tree'] as const)
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

/**
 * GET /graph query key
 */
export function getGetGraphKey() {
  return ['graph', '/graph'] as const
}

/**
 * GET /graph
 */
export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

/**
 * GET /graph
 */
export function useGetGraph(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetGraphKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getGraph(clientOptions), restSwrOptions) }
}

/**
 * GET /graph
 */
export function useImmutableGetGraph(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetGraphKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getGraph(clientOptions), restSwrOptions) }
}

/**
 * GET /graph infinite query key
 */
export function getGetGraphInfiniteKey() {
  return ['graph', '/graph', 'infinite'] as const
}

/**
 * GET /graph
 */
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
