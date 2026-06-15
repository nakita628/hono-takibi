import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getArrayObjectConstraintsSettingsQueryKey(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
) {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/settings', args] as const
}

export function getArrayObjectConstraintsSettingsQueryOptions(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getArrayObjectConstraintsSettingsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useArrayObjectConstraintsSettings<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>
          >
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
    queryKey: getArrayObjectConstraintsSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseArrayObjectConstraintsSettings<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>
          >
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
    queryKey: getArrayObjectConstraintsSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}
