import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/** Key prefix for /graph */
export function getGraphKey() {
  return ['graph'] as const
}

/** Key prefix for /tree */
export function getTreeKey() {
  return ['tree'] as const
}

/** GET /tree query key */
export function getTreeQueryKey() {
  return ['tree', '/tree'] as const
}

/**
 * GET /tree
 */
export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

/**
 * GET /tree query options
 */
export function getTreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /tree
 */
export function useTree(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getTreeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /tree
 */
export function useSuspenseTree(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getTreeQueryOptions(clientOptions), ...queryOptions })
}

/** GET /tree infinite query key */
export function getTreeInfiniteQueryKey() {
  return ['tree', '/tree', 'infinite'] as const
}

/**
 * GET /tree infinite query options
 */
export function getTreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /tree
 */
export function useInfiniteTree(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getTreeInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /tree
 */
export function useSuspenseInfiniteTree(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getTreeInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
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

/** POST /tree */
export function getPostTreeMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['tree', '/tree'] as const,
    async mutationFn(args: InferRequestType<typeof client.tree.$post>) {
      return postTree(args, options)
    },
  })
}

/**
 * POST /tree
 */
export function usePostTree(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTree>>,
    Error,
    InferRequestType<typeof client.tree.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostTreeMutationOptions(clientOptions), ...mutationOptions })
}

/** GET /graph query key */
export function getGraphQueryKey() {
  return ['graph', '/graph'] as const
}

/**
 * GET /graph
 */
export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

/**
 * GET /graph query options
 */
export function getGraphQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /graph
 */
export function useGraph(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGraphQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /graph
 */
export function useSuspenseGraph(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGraphQueryOptions(clientOptions), ...queryOptions })
}

/** GET /graph infinite query key */
export function getGraphInfiniteQueryKey() {
  return ['graph', '/graph', 'infinite'] as const
}

/**
 * GET /graph infinite query options
 */
export function getGraphInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGraphInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /graph
 */
export function useInfiniteGraph(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGraphInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /graph
 */
export function useSuspenseInfiniteGraph(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGraphInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
