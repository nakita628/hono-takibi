import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export function createGetEntities(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.entities.$get>
      | (() => InferResponseType<typeof client.entities.$get>)
    initialData?:
      | InferResponseType<typeof client.entities.$get>
      | (() => InferResponseType<typeof client.entities.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEntitiesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.entities.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /entities
 */
export function getGetEntitiesQueryKey() {
  return ['/entities'] as const
}

/**
 * Returns Svelte Query query options for GET /entities
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetEntitiesQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetEntitiesQueryKey(),
    queryFn: async () => parseResponse(client.entities.$get(undefined, clientOptions)),
  }
}

/**
 * POST /process
 */
export function createPostProcess(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.process.$post>,
      variables: InferRequestType<typeof client.process.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.process.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.process.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.process.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.process.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.process.$post>) =>
      parseResponse(client.process.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /graph
 */
export function createGetGraph(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.graph.$get>
      | (() => InferResponseType<typeof client.graph.$get>)
    initialData?:
      | InferResponseType<typeof client.graph.$get>
      | (() => InferResponseType<typeof client.graph.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGraphQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.graph.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /graph
 */
export function getGetGraphQueryKey() {
  return ['/graph'] as const
}

/**
 * Returns Svelte Query query options for GET /graph
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGraphQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetGraphQueryKey(),
    queryFn: async () => parseResponse(client.graph.$get(undefined, clientOptions)),
  }
}

/**
 * POST /transform
 */
export function createPostTransform(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.transform.$post>,
      variables: InferRequestType<typeof client.transform.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.transform.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.transform.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.transform.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.transform.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.transform.$post>) =>
      parseResponse(client.transform.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
