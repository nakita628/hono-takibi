import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getTrailingSlashRealApiReverseGeocodeIndexQueryKey(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
) {
  return ['trailingSlashReal', '/trailingSlashReal/api/reverseGeocode/', args] as const
}

export function getTrailingSlashRealApiReverseGeocodeIndexQueryOptions(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getTrailingSlashRealApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashRealApiReverseGeocodeIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
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
    queryKey: getTrailingSlashRealApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashRealApiReverseGeocodeIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
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
    queryKey: getTrailingSlashRealApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}
