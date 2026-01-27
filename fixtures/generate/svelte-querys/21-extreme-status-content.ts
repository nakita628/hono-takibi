import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * Generates Svelte Query cache key for GET /extreme-responses
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetExtremeResponsesQueryKey() {
  return ['extreme-responses', '/extreme-responses'] as const
}

/**
 * Returns Svelte Query query options for GET /extreme-responses
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
export function createGetExtremeResponses(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['extreme-responses']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetExtremeResponsesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /multipart-variations
 */
export function createPostMultipartVariations(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['multipart-variations']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['multipart-variations']['$post']>) =>
      parseResponse(client['multipart-variations'].$post(args, clientOptions)),
  }))
}

/**
 * POST /charset-variations
 */
export function createPostCharsetVariations(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['charset-variations']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['charset-variations']['$post']>) =>
      parseResponse(client['charset-variations'].$post(args, clientOptions)),
  }))
}
