import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export function usePostEncodingTest(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['encoding-test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['encoding-test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['encoding-test']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['encoding-test']['$post']>
  >(
    'POST /encoding-test',
    async (_, { arg }) => parseResponse(client['encoding-test'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /content-negotiation
 */
export function useGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['content-negotiation']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/content-negotiation', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['content-negotiation']['$get']>, Error>(
    key,
    async () => parseResponse(client['content-negotiation'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /content-negotiation
 */
export function getGetContentNegotiationKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['GET', '/content-negotiation', args] as const
}

/**
 * POST /binary-variations
 */
export function usePostBinaryVariations(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['binary-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['binary-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['binary-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['binary-variations']['$post']>
  >(
    'POST /binary-variations',
    async (_, { arg }) => parseResponse(client['binary-variations'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /streaming
 */
export function useGetStreaming(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.streaming.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/streaming'] as const) : null
  return useSWR<InferResponseType<typeof client.streaming.$get>, Error>(
    key,
    async () => parseResponse(client.streaming.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /streaming
 */
export function getGetStreamingKey() {
  return ['GET', '/streaming'] as const
}

/**
 * POST /streaming
 */
export function usePostStreaming(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.streaming.$post>,
    Error,
    string,
    InferRequestType<typeof client.streaming.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.streaming.$post>,
    Error,
    string,
    InferRequestType<typeof client.streaming.$post>
  >(
    'POST /streaming',
    async (_, { arg }) => parseResponse(client.streaming.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /url-encoded-complex
 */
export function usePostUrlEncodedComplex(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['url-encoded-complex']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['url-encoded-complex']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['url-encoded-complex']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['url-encoded-complex']['$post']>
  >(
    'POST /url-encoded-complex',
    async (_, { arg }) => parseResponse(client['url-encoded-complex'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /response-encoding
 */
export function useGetResponseEncoding(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['response-encoding']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/response-encoding'] as const) : null
  return useSWR<InferResponseType<(typeof client)['response-encoding']['$get']>, Error>(
    key,
    async () => parseResponse(client['response-encoding'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /response-encoding
 */
export function getGetResponseEncodingKey() {
  return ['GET', '/response-encoding'] as const
}

/**
 * POST /schema-encoding
 */
export function usePostSchemaEncoding(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['schema-encoding']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['schema-encoding']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['schema-encoding']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['schema-encoding']['$post']>
  >(
    'POST /schema-encoding',
    async (_, { arg }) => parseResponse(client['schema-encoding'].$post(arg, options?.client)),
    options?.swr,
  )
}
