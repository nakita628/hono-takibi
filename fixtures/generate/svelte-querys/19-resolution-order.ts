import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * Generates Svelte Query cache key for GET /entities
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetEntitiesQueryKey() {
  return ['entities', '/entities'] as const
}

/**
 * Returns Svelte Query query options for GET /entities
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetEntitiesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.entities.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /entities
 */
export function createGetEntities(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEntitiesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /process
 */
export function createPostProcess(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.process.$post>>>>>,
    Error,
    InferRequestType<typeof client.process.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.process.$post>) =>
      parseResponse(client.process.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /graph
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetGraphQueryKey() {
  return ['graph', '/graph'] as const
}

/**
 * Returns Svelte Query query options for GET /graph
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGraphQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGraphQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.graph.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /graph
 */
export function createGetGraph(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graph.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetGraphQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /transform
 */
export function createPostTransform(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.transform.$post>>>>>,
    Error,
    InferRequestType<typeof client.transform.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.transform.$post>) =>
      parseResponse(client.transform.$post(args, clientOptions)),
  }))
}
