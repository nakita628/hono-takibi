import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * Generates SWR cache key for GET /extreme-responses
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetExtremeResponsesKey() {
  return ['extreme-responses', 'GET', '/extreme-responses'] as const
}

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetExtremeResponsesKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['extreme-responses'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /multipart-variations
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMultipartVariationsMutationKey() {
  return ['multipart-variations', 'POST', '/multipart-variations'] as const
}

/**
 * POST /multipart-variations
 */
export function usePostMultipartVariations(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['multipart-variations']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMultipartVariationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['multipart-variations']['$post']> },
      ) => parseResponse(client['multipart-variations'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /charset-variations
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostCharsetVariationsMutationKey() {
  return ['charset-variations', 'POST', '/charset-variations'] as const
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['charset-variations']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCharsetVariationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['charset-variations']['$post']> },
      ) => parseResponse(client['charset-variations'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
