import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
 * Uses $url() for type-safe key generation
 */
export function getGetExtremeResponsesKey() {
  return client['extreme-responses'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostMultipartVariationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['multipart-variations']['$post']> },
      ) => parseResponse(client['multipart-variations'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /multipart-variations
 * Uses $url() for type-safe key generation
 */
export function getPostMultipartVariationsMutationKey() {
  return `POST ${client['multipart-variations'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostCharsetVariationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['charset-variations']['$post']> },
      ) => parseResponse(client['charset-variations'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /charset-variations
 * Uses $url() for type-safe key generation
 */
export function getPostCharsetVariationsMutationKey() {
  return `POST ${client['charset-variations'].$url().pathname}`
}
