import { createQuery, queryOptions } from '@tanstack/solid-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/solid-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

export function getCategoriesQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCategoriesQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.categories.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createCategories<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$get>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getCategoriesQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.categories.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
