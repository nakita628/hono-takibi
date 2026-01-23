import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['extreme-responses']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/extreme-responses'] as const) : null
  return useSWR<InferResponseType<(typeof client)['extreme-responses']['$get']>, Error>(
    key,
    async () => parseResponse(client['extreme-responses'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /extreme-responses
 */
export function getGetExtremeResponsesKey() {
  return ['GET', '/extreme-responses'] as const
}

/**
 * POST /multipart-variations
 */
export function usePostMultipartVariations(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['multipart-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['multipart-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  >(
    'POST /multipart-variations',
    async (_, { arg }) => parseResponse(client['multipart-variations'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['charset-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['charset-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  >(
    'POST /charset-variations',
    async (_, { arg }) => parseResponse(client['charset-variations'].$post(arg, options?.client)),
    options?.swr,
  )
}
