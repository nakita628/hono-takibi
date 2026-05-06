import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getHealthKey() {
  return ['health'] as const
}

export function getHealthQueryKey() {
  return ['health', '/health'] as const
}

export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

export function getHealthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getHealthQueryKey(),
    queryFn({ signal }) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useHealth<
  TData = Awaited<ReturnType<typeof getHealth>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHealthQueryKey(),
    queryFn({ signal }) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseHealth<
  TData = Awaited<ReturnType<typeof getHealth>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getHealthQueryKey(),
    queryFn({ signal }) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}
