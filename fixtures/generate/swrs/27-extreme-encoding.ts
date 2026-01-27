import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

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
  const swrKey = mutationOptions?.swrKey ?? getPostEncodingTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['encoding-test']['$post']> },
      ) => parseResponse(client['encoding-test'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /encoding-test
 * Uses $url() for type-safe key generation
 */
export function getPostEncodingTestMutationKey() {
  return `POST ${client['encoding-test'].$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetContentNegotiationKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['content-negotiation'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /content-negotiation
 * Uses $url() for type-safe key generation
 */
export function getGetContentNegotiationKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return client['content-negotiation'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostBinaryVariationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['binary-variations']['$post']> },
      ) => parseResponse(client['binary-variations'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /binary-variations
 * Uses $url() for type-safe key generation
 */
export function getPostBinaryVariationsMutationKey() {
  return `POST ${client['binary-variations'].$url().pathname}`
}

/**
 * GET /streaming
 */
export function useGetStreaming(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStreamingKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.streaming.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /streaming
 * Uses $url() for type-safe key generation
 */
export function getGetStreamingKey() {
  return client.streaming.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostStreamingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.streaming.$post> }) =>
        parseResponse(client.streaming.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /streaming
 * Uses $url() for type-safe key generation
 */
export function getPostStreamingMutationKey() {
  return `POST ${client.streaming.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostUrlEncodedComplexMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['url-encoded-complex']['$post']> },
      ) => parseResponse(client['url-encoded-complex'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /url-encoded-complex
 * Uses $url() for type-safe key generation
 */
export function getPostUrlEncodedComplexMutationKey() {
  return `POST ${client['url-encoded-complex'].$url().pathname}`
}

/**
 * GET /response-encoding
 */
export function useGetResponseEncoding(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetResponseEncodingKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['response-encoding'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /response-encoding
 * Uses $url() for type-safe key generation
 */
export function getGetResponseEncodingKey() {
  return client['response-encoding'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostSchemaEncodingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['schema-encoding']['$post']> },
      ) => parseResponse(client['schema-encoding'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /schema-encoding
 * Uses $url() for type-safe key generation
 */
export function getPostSchemaEncodingMutationKey() {
  return `POST ${client['schema-encoding'].$url().pathname}`
}
