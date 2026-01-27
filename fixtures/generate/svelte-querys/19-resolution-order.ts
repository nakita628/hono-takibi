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
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetEntitiesQueryKey() {
  return ['entities', 'GET', '/entities'] as const
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
 * Generates Svelte Query mutation key for POST /process
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProcessMutationKey() {
  return ['process', 'POST', '/process'] as const
}

/**
 * Returns Svelte Query mutation options for POST /process
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProcessMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostProcessMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.process.$post>) =>
    parseResponse(client.process.$post(args, clientOptions)),
})

/**
 * POST /process
 */
export function createPostProcess(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.process.$post>>>>>,
      Error,
      InferRequestType<typeof client.process.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostProcessMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
 * Generates Svelte Query mutation key for POST /transform
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTransformMutationKey() {
  return ['transform', 'POST', '/transform'] as const
}

/**
 * Returns Svelte Query mutation options for POST /transform
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTransformMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTransformMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.transform.$post>) =>
    parseResponse(client.transform.$post(args, clientOptions)),
})

/**
 * POST /transform
 */
export function createPostTransform(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.transform.$post>>>>>,
      Error,
      InferRequestType<typeof client.transform.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTransformMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
