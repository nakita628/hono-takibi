import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export function usePostEncodingTest(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['encoding-test']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['encoding-test']['$post']>
  >({
    mutationFn: async (args) => parseResponse(client['encoding-test'].$post(args, clientOptions)),
  })
}

/**
 * GET /content-negotiation
 */
export function useGetContentNegotiation(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetContentNegotiationQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['content-negotiation'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /content-negotiation
 */
export function getGetContentNegotiationQueryKey(
  args: InferRequestType<(typeof client)['content-negotiation']['$get']>,
) {
  return ['/content-negotiation', args] as const
}

/**
 * POST /binary-variations
 */
export function usePostBinaryVariations(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['binary-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['binary-variations']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['binary-variations'].$post(args, clientOptions)),
  })
}

/**
 * GET /streaming
 */
export function useGetStreaming(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetStreamingQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.streaming.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /streaming
 */
export function getGetStreamingQueryKey() {
  return ['/streaming'] as const
}

/**
 * POST /streaming
 */
export function usePostStreaming(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.streaming.$post> | undefined,
    Error,
    InferRequestType<typeof client.streaming.$post>
  >({ mutationFn: async (args) => parseResponse(client.streaming.$post(args, clientOptions)) })
}

/**
 * POST /url-encoded-complex
 */
export function usePostUrlEncodedComplex(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['url-encoded-complex']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['url-encoded-complex']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['url-encoded-complex'].$post(args, clientOptions)),
  })
}

/**
 * GET /response-encoding
 */
export function useGetResponseEncoding(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetResponseEncodingQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['response-encoding'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /response-encoding
 */
export function getGetResponseEncodingQueryKey() {
  return ['/response-encoding'] as const
}

/**
 * POST /schema-encoding
 */
export function usePostSchemaEncoding(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['schema-encoding']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['schema-encoding']['$post']>
  >({
    mutationFn: async (args) => parseResponse(client['schema-encoding'].$post(args, clientOptions)),
  })
}
