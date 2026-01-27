import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-nullable'

/**
 * Generates Vue Query cache key for GET /nullable
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetNullableQueryKey() {
  return ['nullable', '/nullable'] as const
}

/**
 * Returns Vue Query query options for GET /nullable
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNullableQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNullableQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.nullable.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export function useGetNullable(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.nullable.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNullableQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
