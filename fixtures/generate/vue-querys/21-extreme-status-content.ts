import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetExtremeResponsesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['extreme-responses'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /extreme-responses
 */
export function getGetExtremeResponsesQueryKey() {
  return ['/extreme-responses'] as const
}

/**
 * POST /multipart-variations
 */
export function usePostMultipartVariations(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['multipart-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['multipart-variations'].$post(args, clientOptions)),
  })
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['charset-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['charset-variations'].$post(args, clientOptions)),
  })
}
