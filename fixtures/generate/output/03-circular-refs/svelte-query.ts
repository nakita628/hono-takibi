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

/** Key prefix for /graph */
export function getGraphKey() {
  return ['graph'] as const
}

/** Key prefix for /tree */
export function getTreeKey() {
  return ['tree'] as const
}

/** GET /tree query key */
export function getTreeQueryKey() {
  return ['tree', '/tree'] as const
}

/**
 * GET /tree
 */
export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

/**
 * GET /tree query options
 */
export function getTreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /tree
 */
export function createTree(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getTreeQueryOptions(clientOptions), ...query }
  })
}

/** GET /tree infinite query key */
export function getTreeInfiniteQueryKey() {
  return ['tree', '/tree', 'infinite'] as const
}

/**
 * GET /tree infinite query options
 */
export function getTreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /tree
 */
export function createInfiniteTree(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getTreeInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * POST /tree
 */
export async function postTree(
  args: InferRequestType<typeof client.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tree.$post(args, options))
}

/** POST /tree */
export function getPostTreeMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['tree', '/tree'] as const,
    async mutationFn(args: InferRequestType<typeof client.tree.$post>) {
      return postTree(args, options)
    },
  }
}

/**
 * POST /tree
 */
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

/** GET /graph query key */
export function getGraphQueryKey() {
  return ['graph', '/graph'] as const
}

/**
 * GET /graph
 */
export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

/**
 * GET /graph query options
 */
export function getGraphQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /graph
 */
export function createGraph(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGraphQueryOptions(clientOptions), ...query }
  })
}

/** GET /graph infinite query key */
export function getGraphInfiniteQueryKey() {
  return ['graph', '/graph', 'infinite'] as const
}

/**
 * GET /graph infinite query options
 */
export function getGraphInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGraphInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /graph
 */
export function createInfiniteGraph(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGraphInfiniteQueryOptions(clientOptions), ...query }
  })
}
