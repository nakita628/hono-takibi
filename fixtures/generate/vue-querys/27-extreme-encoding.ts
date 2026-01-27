import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/27-extreme-encoding'

/**
 * Generates Vue Query mutation key for POST /encoding-test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEncodingTestMutationKey() {
  return ['encoding-test', 'POST', '/encoding-test'] as const
}

/**
 * Returns Vue Query mutation options for POST /encoding-test
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['encoding-test']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['encoding-test']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostEncodingTestMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /content-negotiation
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetContentNegotiationQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['content-negotiation']['$get']>>,
) {
  return ['content-negotiation', 'GET', '/content-negotiation', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /content-negotiation
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['content-negotiation']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /binary-variations
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostBinaryVariationsMutationKey() {
  return ['binary-variations', 'POST', '/binary-variations'] as const
}

/**
 * Returns Vue Query mutation options for POST /binary-variations
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['binary-variations']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['binary-variations']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostBinaryVariationsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /streaming
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStreamingQueryKey() {
  return ['streaming', 'GET', '/streaming'] as const
}

/**
 * Returns Vue Query query options for GET /streaming
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStreamingQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /streaming
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostStreamingMutationKey() {
  return ['streaming', 'POST', '/streaming'] as const
}

/**
 * Returns Vue Query mutation options for POST /streaming
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.streaming.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostStreamingMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /url-encoded-complex
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUrlEncodedComplexMutationKey() {
  return ['url-encoded-complex', 'POST', '/url-encoded-complex'] as const
}

/**
 * Returns Vue Query mutation options for POST /url-encoded-complex
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['url-encoded-complex']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['url-encoded-complex']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostUrlEncodedComplexMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /response-encoding
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetResponseEncodingQueryKey() {
  return ['response-encoding', 'GET', '/response-encoding'] as const
}

/**
 * Returns Vue Query query options for GET /response-encoding
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['response-encoding']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetResponseEncodingQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /schema-encoding
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSchemaEncodingMutationKey() {
  return ['schema-encoding', 'POST', '/schema-encoding'] as const
}

/**
 * Returns Vue Query mutation options for POST /schema-encoding
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['schema-encoding']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['schema-encoding']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSchemaEncodingMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
