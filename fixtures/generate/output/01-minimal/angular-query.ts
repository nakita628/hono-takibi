import { injectQuery, queryOptions } from '@tanstack/angular-query-experimental'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/angular-query-experimental'
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
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectHealth<TData = Awaited<ReturnType<typeof getHealth>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getHealthQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}
