import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getGraphKey() {
  return ['graph'] as const
}

export function getTreeKey() {
  return ['tree'] as const
}

export function getTreeQueryKey() {
  return ['tree', '/tree'] as const
}

export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

export function getTreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createTree<TData = Awaited<ReturnType<typeof getTree>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTree>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getTreeQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getTree({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getTreeInfiniteQueryKey() {
  return ['tree', '/tree', 'infinite'] as const
}

export function getTreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteTree(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getTreeInfiniteQueryOptions(clientOptions) }
  })
}

export async function postTree(
  args: InferRequestType<typeof client.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tree.$post(args, options))
}

export function getPostTreeMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['tree', '/tree', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.tree.$post>) {
      return postTree(args, options)
    },
  }
}

export function createPostTree(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postTree>>,
      Error,
      InferRequestType<typeof client.tree.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostTreeMutationOptions(clientOptions), ...mutation }
  })
}

export function getGraphQueryKey() {
  return ['graph', '/graph'] as const
}

export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

export function getGraphQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createGraph<TData = Awaited<ReturnType<typeof getGraph>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getGraphQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getGraph({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getGraphInfiniteQueryKey() {
  return ['graph', '/graph', 'infinite'] as const
}

export function getGraphInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGraphInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteGraph(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getGraphInfiniteQueryOptions(clientOptions) }
  })
}
