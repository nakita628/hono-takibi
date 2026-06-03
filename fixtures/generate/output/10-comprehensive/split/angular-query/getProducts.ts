import { injectQuery, queryOptions } from '@tanstack/angular-query-experimental'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['products', '/products', args] as const
}

export function getProductsQueryOptions(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.products.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectProducts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$get>>>>
  >,
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.products.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getProductsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.products.$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
