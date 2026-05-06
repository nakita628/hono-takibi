import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
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
  return {
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getHealthQueryKey>>) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useHealth<
  TData = Awaited<ReturnType<typeof getHealth>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getHealth>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getHealth>>,
    ReturnType<typeof getHealthQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getHealthQueryKey>>) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}
