import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export function createPostEncodingTest(options?: {
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['encoding-test']['$post']>) =>
      parseResponse(client['encoding-test'].$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /content-negotiation
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetContentNegotiationQueryKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['content-negotiation', '/content-negotiation', args] as const
}

/**
 * Returns Svelte Query query options for GET /content-negotiation
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
export function createGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetContentNegotiationQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /binary-variations
 */
export function createPostBinaryVariations(options?: {
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['binary-variations']['$post']>) =>
      parseResponse(client['binary-variations'].$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /streaming
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStreamingQueryKey() {
  return ['streaming', '/streaming'] as const
}

/**
 * Returns Svelte Query query options for GET /streaming
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
export function createGetStreaming(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetStreamingQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /streaming
 */
export function createPostStreaming(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$post>>>>>,
    Error,
    InferRequestType<typeof client.streaming.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.streaming.$post>) =>
      parseResponse(client.streaming.$post(args, clientOptions)),
  }))
}

/**
 * POST /url-encoded-complex
 */
export function createPostUrlEncodedComplex(options?: {
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['url-encoded-complex']['$post']>) =>
      parseResponse(client['url-encoded-complex'].$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /response-encoding
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetResponseEncodingQueryKey() {
  return ['response-encoding', '/response-encoding'] as const
}

/**
 * Returns Svelte Query query options for GET /response-encoding
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
export function createGetResponseEncoding(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['response-encoding']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetResponseEncodingQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /schema-encoding
 */
export function createPostSchemaEncoding(options?: {
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['schema-encoding']['$post']>) =>
      parseResponse(client['schema-encoding'].$post(args, clientOptions)),
  }))
}
