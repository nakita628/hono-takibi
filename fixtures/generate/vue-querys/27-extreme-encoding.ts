import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export function usePostEncodingTest(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['encoding-test']['$post']>) =>
      parseResponse(client['encoding-test'].$post(args, clientOptions)),
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['binary-variations']['$post']>) =>
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.streaming.$post>) =>
      parseResponse(client.streaming.$post(args, clientOptions)),
  })
}

/**
 * POST /url-encoded-complex
 */
export function usePostUrlEncodedComplex(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['url-encoded-complex']['$post']>) =>
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['schema-encoding']['$post']>) =>
      parseResponse(client['schema-encoding'].$post(args, clientOptions)),
  })
}
