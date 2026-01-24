import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export function createPostEncodingTest(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['encoding-test']['$post']>) =>
        parseResponse(client['encoding-test'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /content-negotiation
 */
export function createGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['content-negotiation']['$get']>,
      Error,
      InferResponseType<(typeof client)['content-negotiation']['$get']>,
      readonly [
        '/content-negotiation',
        InferRequestType<(typeof client)['content-negotiation']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetContentNegotiationQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['content-negotiation'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /content-negotiation
 */
export function getGetContentNegotiationQueryKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['/content-negotiation', args] as const
}

/**
 * POST /binary-variations
 */
export function createPostBinaryVariations(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['binary-variations']['$post']>) =>
        parseResponse(client['binary-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /streaming
 */
export function createGetStreaming(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.streaming.$get>,
      Error,
      InferResponseType<typeof client.streaming.$get>,
      readonly ['/streaming']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStreamingQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.streaming.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /streaming
 */
export function getGetStreamingQueryKey() {
  return ['/streaming'] as const
}

/**
 * POST /streaming
 */
export function createPostStreaming(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.streaming.$post>) =>
        parseResponse(client.streaming.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /url-encoded-complex
 */
export function createPostUrlEncodedComplex(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['url-encoded-complex']['$post']>) =>
        parseResponse(client['url-encoded-complex'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /response-encoding
 */
export function createGetResponseEncoding(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['response-encoding']['$get']>,
      Error,
      InferResponseType<(typeof client)['response-encoding']['$get']>,
      readonly ['/response-encoding']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetResponseEncodingQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['response-encoding'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /response-encoding
 */
export function getGetResponseEncodingQueryKey() {
  return ['/response-encoding'] as const
}

/**
 * POST /schema-encoding
 */
export function createPostSchemaEncoding(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['schema-encoding']['$post']>) =>
        parseResponse(client['schema-encoding'].$post(args, options?.client)),
    },
    queryClient,
  )
}
