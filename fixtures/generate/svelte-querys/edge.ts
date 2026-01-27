import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function createPostPolymorphic(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$post>>>>
      >,
      variables: InferRequestType<typeof client.polymorphic.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.polymorphic.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$post>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.polymorphic.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.polymorphic.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.polymorphic.$post>) =>
      parseResponse(client.polymorphic.$post(args, clientOptions)),
  }))
}

/**
 * GET /search
 *
 * Search with complex query
 */
export function createGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetSearchQueryOptions(args, clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /search
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['/search', args] as const
}

/**
 * Returns Svelte Query query options for GET /search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchQueryOptions = (
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSearchQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.search.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function createPutMultiStep(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-step']['$put']>>>
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client)['multi-step']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['multi-step']['$put']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-step']['$put']>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['multi-step']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['multi-step']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['multi-step']['$put']>) =>
      parseResponse(client['multi-step'].$put(args, clientOptions)),
  }))
}
