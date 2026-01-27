import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/27-extreme-encoding'

/**
 * Generates SWR mutation key for POST /encoding-test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEncodingTestMutationKey() {
  return ['encoding-test', 'POST', '/encoding-test'] as const
}

/**
 * POST /encoding-test
 */
export function usePostEncodingTest(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['encoding-test']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['encoding-test']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEncodingTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['encoding-test']['$post']> },
      ) => parseResponse(client['encoding-test'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /content-negotiation
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetContentNegotiationKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['content-negotiation', 'GET', '/content-negotiation', args] as const
}

/**
 * GET /content-negotiation
 */
export function useGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetContentNegotiationKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['content-negotiation'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /binary-variations
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostBinaryVariationsMutationKey() {
  return ['binary-variations', 'POST', '/binary-variations'] as const
}

/**
 * POST /binary-variations
 */
export function usePostBinaryVariations(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['binary-variations']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['binary-variations']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostBinaryVariationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['binary-variations']['$post']> },
      ) => parseResponse(client['binary-variations'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /streaming
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStreamingKey() {
  return ['streaming', 'GET', '/streaming'] as const
}

/**
 * GET /streaming
 */
export function useGetStreaming(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetStreamingKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.streaming.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /streaming
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostStreamingMutationKey() {
  return ['streaming', 'POST', '/streaming'] as const
}

/**
 * POST /streaming
 */
export function usePostStreaming(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.streaming.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostStreamingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.streaming.$post> }) =>
        parseResponse(client.streaming.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /url-encoded-complex
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUrlEncodedComplexMutationKey() {
  return ['url-encoded-complex', 'POST', '/url-encoded-complex'] as const
}

/**
 * POST /url-encoded-complex
 */
export function usePostUrlEncodedComplex(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['url-encoded-complex']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['url-encoded-complex']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUrlEncodedComplexMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['url-encoded-complex']['$post']> },
      ) => parseResponse(client['url-encoded-complex'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /response-encoding
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetResponseEncodingKey() {
  return ['response-encoding', 'GET', '/response-encoding'] as const
}

/**
 * GET /response-encoding
 */
export function useGetResponseEncoding(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetResponseEncodingKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['response-encoding'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /schema-encoding
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSchemaEncodingMutationKey() {
  return ['schema-encoding', 'POST', '/schema-encoding'] as const
}

/**
 * POST /schema-encoding
 */
export function usePostSchemaEncoding(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['schema-encoding']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['schema-encoding']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSchemaEncodingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['schema-encoding']['$post']> },
      ) => parseResponse(client['schema-encoding'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
