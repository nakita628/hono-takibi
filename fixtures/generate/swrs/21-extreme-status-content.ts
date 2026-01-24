import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
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
export function usePostMultipartVariations(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /multipart-variations',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['multipart-variations']['$post']> },
    ) => parseResponse(client['multipart-variations'].$post(arg, options?.client)),
  )
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /charset-variations',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['charset-variations']['$post']> },
    ) => parseResponse(client['charset-variations'].$post(arg, options?.client)),
  )
}
