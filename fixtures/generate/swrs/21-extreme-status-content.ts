import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetExtremeResponsesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['extreme-responses'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['multipart-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /multipart-variations',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['multipart-variations']['$post']> },
    ) => parseResponse(client['multipart-variations'].$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['charset-variations']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /charset-variations',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['charset-variations']['$post']> },
    ) => parseResponse(client['charset-variations'].$post(arg, clientOptions)),
    mutationOptions,
  )
}
