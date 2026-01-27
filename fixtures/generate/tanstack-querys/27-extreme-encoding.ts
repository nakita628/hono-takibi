import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * Generates TanStack Query mutation key for POST /encoding-test
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostEncodingTestMutationKey() {
  return ['POST', '/encoding-test'] as const
}

/**
 * Returns TanStack Query mutation options for POST /encoding-test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostEncodingTestMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostEncodingTestMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['encoding-test']['$post']>) =>
    parseResponse(client['encoding-test'].$post(args, clientOptions)),
})

/**
 * POST /encoding-test
 */
export function usePostEncodingTest(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['encoding-test']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['encoding-test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['encoding-test']['$post']>) =>
      parseResponse(client['encoding-test'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /content-negotiation
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetContentNegotiationQueryKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['content-negotiation', '/content-negotiation', args] as const
}

/**
 * Returns TanStack Query query options for GET /content-negotiation
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetContentNegotiationQueryOptions = (
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetContentNegotiationQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['content-negotiation'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /content-negotiation
 */
export function useGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['content-negotiation']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetContentNegotiationQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /binary-variations
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostBinaryVariationsMutationKey() {
  return ['POST', '/binary-variations'] as const
}

/**
 * Returns TanStack Query mutation options for POST /binary-variations
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostBinaryVariationsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostBinaryVariationsMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['binary-variations']['$post']>) =>
    parseResponse(client['binary-variations'].$post(args, clientOptions)),
})

/**
 * POST /binary-variations
 */
export function usePostBinaryVariations(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['binary-variations']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['binary-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['binary-variations']['$post']>) =>
      parseResponse(client['binary-variations'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /streaming
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStreamingQueryKey() {
  return ['streaming', '/streaming'] as const
}

/**
 * Returns TanStack Query query options for GET /streaming
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStreamingQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStreamingQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.streaming.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /streaming
 */
export function useGetStreaming(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStreamingQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /streaming
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostStreamingMutationKey() {
  return ['POST', '/streaming'] as const
}

/**
 * Returns TanStack Query mutation options for POST /streaming
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostStreamingMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostStreamingMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.streaming.$post>) =>
    parseResponse(client.streaming.$post(args, clientOptions)),
})

/**
 * POST /streaming
 */
export function usePostStreaming(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$post>>>>>,
    Error,
    InferRequestType<typeof client.streaming.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.streaming.$post>) =>
      parseResponse(client.streaming.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /url-encoded-complex
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostUrlEncodedComplexMutationKey() {
  return ['POST', '/url-encoded-complex'] as const
}

/**
 * Returns TanStack Query mutation options for POST /url-encoded-complex
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUrlEncodedComplexMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUrlEncodedComplexMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['url-encoded-complex']['$post']>) =>
    parseResponse(client['url-encoded-complex'].$post(args, clientOptions)),
})

/**
 * POST /url-encoded-complex
 */
export function usePostUrlEncodedComplex(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['url-encoded-complex']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['url-encoded-complex']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['url-encoded-complex']['$post']>) =>
      parseResponse(client['url-encoded-complex'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /response-encoding
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetResponseEncodingQueryKey() {
  return ['response-encoding', '/response-encoding'] as const
}

/**
 * Returns TanStack Query query options for GET /response-encoding
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResponseEncodingQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetResponseEncodingQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['response-encoding'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /response-encoding
 */
export function useGetResponseEncoding(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['response-encoding']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetResponseEncodingQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /schema-encoding
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostSchemaEncodingMutationKey() {
  return ['POST', '/schema-encoding'] as const
}

/**
 * Returns TanStack Query mutation options for POST /schema-encoding
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSchemaEncodingMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSchemaEncodingMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['schema-encoding']['$post']>) =>
    parseResponse(client['schema-encoding'].$post(args, clientOptions)),
})

/**
 * POST /schema-encoding
 */
export function usePostSchemaEncoding(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['schema-encoding']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['schema-encoding']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['schema-encoding']['$post']>) =>
      parseResponse(client['schema-encoding'].$post(args, clientOptions)),
  })
}
