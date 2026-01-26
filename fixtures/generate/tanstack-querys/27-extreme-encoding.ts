import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export function usePostEncodingTest(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['encoding-test']['$post']>,
      variables: InferRequestType<(typeof client)['encoding-test']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['encoding-test']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['encoding-test']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['encoding-test']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['encoding-test']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['encoding-test']['$post']>) =>
      parseResponse(client['encoding-test'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /content-negotiation
 */
export function useGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
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
  return useQuery({ ...getGetContentNegotiationQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /content-negotiation
 */
export function getGetContentNegotiationQueryKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['/content-negotiation', args] as const
}

/**
 * Returns TanStack Query query options for GET /content-negotiation
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetContentNegotiationQueryOptions = (
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetContentNegotiationQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['content-negotiation'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /binary-variations
 */
export function usePostBinaryVariations(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['binary-variations']['$post']>,
      variables: InferRequestType<(typeof client)['binary-variations']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['binary-variations']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['binary-variations']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['binary-variations']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['binary-variations']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['binary-variations']['$post']>) =>
      parseResponse(client['binary-variations'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /streaming
 */
export function useGetStreaming(options?: {
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
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetStreamingQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /streaming
 */
export function getGetStreamingQueryKey() {
  return ['/streaming'] as const
}

/**
 * Returns TanStack Query query options for GET /streaming
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStreamingQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetStreamingQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.streaming.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /streaming
 */
export function usePostStreaming(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.streaming.$post>,
      variables: InferRequestType<typeof client.streaming.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.streaming.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.streaming.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.streaming.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.streaming.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.streaming.$post>) =>
      parseResponse(client.streaming.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /url-encoded-complex
 */
export function usePostUrlEncodedComplex(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['url-encoded-complex']['$post']>,
      variables: InferRequestType<(typeof client)['url-encoded-complex']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['url-encoded-complex']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['url-encoded-complex']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['url-encoded-complex']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['url-encoded-complex']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['url-encoded-complex']['$post']>) =>
      parseResponse(client['url-encoded-complex'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /response-encoding
 */
export function useGetResponseEncoding(options?: {
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
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetResponseEncodingQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /response-encoding
 */
export function getGetResponseEncodingQueryKey() {
  return ['/response-encoding'] as const
}

/**
 * Returns TanStack Query query options for GET /response-encoding
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResponseEncodingQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetResponseEncodingQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['response-encoding'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /schema-encoding
 */
export function usePostSchemaEncoding(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['schema-encoding']['$post']>,
      variables: InferRequestType<(typeof client)['schema-encoding']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['schema-encoding']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['schema-encoding']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['schema-encoding']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['schema-encoding']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['schema-encoding']['$post']>) =>
      parseResponse(client['schema-encoding'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}
