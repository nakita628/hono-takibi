import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(options?: {
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
      | InferResponseType<(typeof client)['extreme-responses']['$get']>
      | (() => InferResponseType<(typeof client)['extreme-responses']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['extreme-responses']['$get']>
      | (() => InferResponseType<(typeof client)['extreme-responses']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetExtremeResponsesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['extreme-responses'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /extreme-responses
 */
export function getGetExtremeResponsesQueryKey() {
  return ['/extreme-responses'] as const
}

/**
 * Returns Vue Query query options for GET /extreme-responses
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExtremeResponsesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetExtremeResponsesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['extreme-responses'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /multipart-variations
 */
export function usePostMultipartVariations(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['multipart-variations']['$post']>,
      variables: InferRequestType<(typeof client)['multipart-variations']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['multipart-variations']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['multipart-variations']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['multipart-variations']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['multipart-variations']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['multipart-variations']['$post']>) =>
      parseResponse(client['multipart-variations'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['charset-variations']['$post']>,
      variables: InferRequestType<(typeof client)['charset-variations']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['charset-variations']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['charset-variations']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['charset-variations']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['charset-variations']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['charset-variations']['$post']>) =>
      parseResponse(client['charset-variations'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}
