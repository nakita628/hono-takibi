import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['extreme-responses']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetExtremeResponsesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /extreme-responses
 * Uses $url() for type-safe key generation
 */
export function getGetExtremeResponsesQueryKey() {
  return [client['extreme-responses'].$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /extreme-responses
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExtremeResponsesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExtremeResponsesQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['extreme-responses'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /multipart-variations
 */
export function usePostMultipartVariations(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['multipart-variations']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['multipart-variations']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['multipart-variations']['$post']>) =>
      parseResponse(client['multipart-variations'].$post(args, clientOptions)),
  })
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['charset-variations']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['charset-variations']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['charset-variations']['$post']>) =>
      parseResponse(client['charset-variations'].$post(args, clientOptions)),
  })
}
