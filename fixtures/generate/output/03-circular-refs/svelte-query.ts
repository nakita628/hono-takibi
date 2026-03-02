import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query cache key for GET /tree
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTreeQueryKey() {
  return ['tree', 'GET', '/tree'] as const
}

/**
 * GET /tree
 */
export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /tree
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTreeQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /tree
 */
export function createGetTree(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetTreeQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /tree
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTreeMutationKey() {
  return ['tree', 'POST', '/tree'] as const
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
 * Returns Svelte Query mutation options for POST /tree
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostTreeMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostTreeMutationKey(),
    async mutationFn(args: Parameters<typeof postTree>[0]) {
      return postTree(args, clientOptions)
    },
  }
}

/**
 * POST /tree
 */
export function createPostTree(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postTree>>,
      Error,
      Parameters<typeof postTree>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostTreeMutationOptions(opts?.client), ...opts?.mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /graph
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetGraphQueryKey() {
  return ['graph', 'GET', '/graph'] as const
}

/**
 * GET /graph
 */
export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /graph
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGraphQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /graph
 */
export function createGetGraph(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetGraphQueryOptions(opts?.client), ...opts?.query }
  })
}
