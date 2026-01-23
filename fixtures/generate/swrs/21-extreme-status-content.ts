import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['extreme-responses']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetExtremeResponsesKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['extreme-responses']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['extreme-responses'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /extreme-responses
 */
export function getGetExtremeResponsesKey() {
  return ['/extreme-responses'] as const
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
