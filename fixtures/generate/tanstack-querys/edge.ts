import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.polymorphic.$post>,
      variables: InferRequestType<typeof client.polymorphic.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.polymorphic.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.polymorphic.$post> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.polymorphic.$post>) =>
      parseResponse(client.polymorphic.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /search
 *
 * Search with complex query
 */
export function useGetSearch(
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
  return useQuery({
    queryKey: getGetSearchQueryKey(args),
    queryFn: async () => parseResponse(client.search.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /search
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['/search', args] as const
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
      variables: InferRequestType<(typeof client)['multi-step']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['multi-step']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['multi-step']['$put']>) =>
      parseResponse(client['multi-step'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}
