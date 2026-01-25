import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
  return useQuery({
    queryKey: getGetContentNegotiationQueryKey(args),
    queryFn: async () => parseResponse(client['content-negotiation'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
  return useQuery({
    queryKey: getGetStreamingQueryKey(),
    queryFn: async () => parseResponse(client.streaming.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /streaming
 */
export function getGetStreamingQueryKey() {
  return ['/streaming'] as const
}

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
  return useQuery({
    queryKey: getGetResponseEncodingQueryKey(),
    queryFn: async () => parseResponse(client['response-encoding'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /response-encoding
 */
export function getGetResponseEncodingQueryKey() {
  return ['/response-encoding'] as const
}

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
