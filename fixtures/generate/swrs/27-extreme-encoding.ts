import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['content-negotiation']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetContentNegotiationKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client)['content-negotiation']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['content-negotiation'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<typeof client.streaming.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStreamingKey() : null)
  const query = useSWR<InferResponseType<typeof client.streaming.$get>, Error>(
    swrKey,
    async () => parseResponse(client.streaming.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['response-encoding']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetResponseEncodingKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['response-encoding']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['response-encoding'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
