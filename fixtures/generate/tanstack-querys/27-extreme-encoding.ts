import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export function usePostEncodingTest(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['encoding-test']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['encoding-test']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['encoding-test']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['encoding-test']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['encoding-test'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /content-negotiation
 */
export function useGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['content-negotiation']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetContentNegotiationQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['content-negotiation'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /content-negotiation
 */
export function getGetContentNegotiationQueryKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['GET', '/content-negotiation', args] as const
}

/**
 * POST /binary-variations
 */
export function usePostBinaryVariations(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['binary-variations']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['binary-variations']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['binary-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['binary-variations']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['binary-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /streaming
 */
export function useGetStreaming(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.streaming.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStreamingQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.streaming.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /streaming
 */
export function getGetStreamingQueryKey() {
  return ['GET', '/streaming'] as const
}

/**
 * POST /streaming
 */
export function usePostStreaming(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.streaming.$post> | undefined,
      Error,
      InferRequestType<typeof client.streaming.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.streaming.$post> | undefined,
    Error,
    InferRequestType<typeof client.streaming.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.streaming.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /url-encoded-complex
 */
export function usePostUrlEncodedComplex(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['url-encoded-complex']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['url-encoded-complex']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['url-encoded-complex']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['url-encoded-complex']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['url-encoded-complex'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /response-encoding
 */
export function useGetResponseEncoding(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['response-encoding']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetResponseEncodingQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['response-encoding'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /response-encoding
 */
export function getGetResponseEncodingQueryKey() {
  return ['GET', '/response-encoding'] as const
}

/**
 * POST /schema-encoding
 */
export function usePostSchemaEncoding(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['schema-encoding']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['schema-encoding']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['schema-encoding']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['schema-encoding']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['schema-encoding'].$post(args, options?.client)),
    },
    queryClient,
  )
}
