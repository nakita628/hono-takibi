import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
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

export function createHealth<TData = Awaited<ReturnType<typeof getHealth>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
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

export function getHealthInfiniteQueryKey() {
  return ['health', '/health', 'infinite'] as const
}

export function getHealthInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHealthInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteHealth(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getHealthInfiniteQueryOptions(clientOptions) }
  })
}
