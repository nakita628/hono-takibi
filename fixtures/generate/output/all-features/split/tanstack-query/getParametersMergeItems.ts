import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getParametersMergeItemsQueryKey(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
) {
  return ['parametersMerge', '/parametersMerge/items', args] as const
}

export function getParametersMergeItemsQueryOptions(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getParametersMergeItemsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.parametersMerge.items.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useParametersMergeItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getParametersMergeItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseParametersMergeItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getParametersMergeItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}
