import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
    string,
    InferRequestType<(typeof client)['encoding-test']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /encoding-test',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['encoding-test']['$post']> },
    ) => parseResponse(client['encoding-test'].$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetContentNegotiationKey(
  args?: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['/content-negotiation', ...(args ? [args] : [])] as const
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
    string,
    InferRequestType<(typeof client)['binary-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /binary-variations',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['binary-variations']['$post']> },
    ) => parseResponse(client['binary-variations'].$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetStreamingKey() {
  return ['/streaming'] as const
}

/**
 * POST /streaming
 */
export function usePostStreaming(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.streaming.$post>>>>>,
    Error,
    string,
    InferRequestType<typeof client.streaming.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /streaming',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.streaming.$post> }) =>
      parseResponse(client.streaming.$post(arg, clientOptions)),
    mutationOptions,
  )
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
    string,
    InferRequestType<(typeof client)['url-encoded-complex']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /url-encoded-complex',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['url-encoded-complex']['$post']> },
    ) => parseResponse(client['url-encoded-complex'].$post(arg, clientOptions)),
    mutationOptions,
  )
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
 */
export function getGetResponseEncodingKey() {
  return ['/response-encoding'] as const
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
    string,
    InferRequestType<(typeof client)['schema-encoding']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /schema-encoding',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['schema-encoding']['$post']> },
    ) => parseResponse(client['schema-encoding'].$post(arg, clientOptions)),
    mutationOptions,
  )
}
