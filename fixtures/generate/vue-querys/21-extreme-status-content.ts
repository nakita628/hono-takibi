import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * Generates Vue Query cache key for GET /extreme-responses
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetExtremeResponsesQueryKey() {
  return ['extreme-responses', '/extreme-responses'] as const
}

/**
 * Returns Vue Query query options for GET /extreme-responses
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExtremeResponsesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExtremeResponsesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['extreme-responses'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  const { queryKey, queryFn, ...baseOptions } = getGetExtremeResponsesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /multipart-variations
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostMultipartVariationsMutationKey() {
  return ['POST', '/multipart-variations'] as const
}

/**
 * Returns Vue Query mutation options for POST /multipart-variations
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMultipartVariationsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostMultipartVariationsMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['multipart-variations']['$post']>) =>
    parseResponse(client['multipart-variations'].$post(args, clientOptions)),
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
 * Generates Vue Query mutation key for POST /charset-variations
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostCharsetVariationsMutationKey() {
  return ['POST', '/charset-variations'] as const
}

/**
 * Returns Vue Query mutation options for POST /charset-variations
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostCharsetVariationsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostCharsetVariationsMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['charset-variations']['$post']>) =>
    parseResponse(client['charset-variations'].$post(args, clientOptions)),
})

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
