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

/** Key prefix for /subscriptions */
export function getSubscriptionsKey() {
  return ['subscriptions'] as const
}

/** Key prefix for /webhooks */
export function getWebhooksKey() {
  return ['webhooks'] as const
}

/**
 * POST /subscriptions
 */
export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions.$post(args, options))
}

/** POST /subscriptions */
export function getPostSubscriptionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['subscriptions', '/subscriptions'] as const,
    async mutationFn(args: InferRequestType<typeof client.subscriptions.$post>) {
      return postSubscriptions(args, options)
    },
  }
}

/**
 * POST /subscriptions
 */
export function createPostSubscriptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postSubscriptions>>,
      Error,
      InferRequestType<typeof client.subscriptions.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostSubscriptionsMutationOptions(clientOptions), ...mutation }
  })
}

/** GET /subscriptions/{id} query key */
export function getSubscriptionsIdQueryKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', '/subscriptions/:id', args] as const
}

/**
 * GET /subscriptions/{id}
 */
export async function getSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$get(args, options))
}

/**
 * GET /subscriptions/{id} query options
 */
export function getSubscriptionsIdQueryOptions(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /subscriptions/{id}
 */
export function createSubscriptionsId(
  args: () => InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getSubscriptionsIdQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /subscriptions/{id} infinite query key */
export function getSubscriptionsIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', '/subscriptions/:id', args, 'infinite'] as const
}

/**
 * GET /subscriptions/{id} infinite query options
 */
export function getSubscriptionsIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getSubscriptionsIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /subscriptions/{id}
 */
export function createInfiniteSubscriptionsId(
  args: () => InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getSubscriptionsIdInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * DELETE /subscriptions/{id}
 */
export async function deleteSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$delete(args, options))
}

/** DELETE /subscriptions/{id} */
export function getDeleteSubscriptionsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['subscriptions', '/subscriptions/:id'] as const,
    async mutationFn(args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>) {
      return deleteSubscriptionsId(args, options)
    },
  }
}

/**
 * DELETE /subscriptions/{id}
 */
export function createDeleteSubscriptionsId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteSubscriptionsId>> | undefined,
      Error,
      InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeleteSubscriptionsIdMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * POST /webhooks/test
 */
export async function postWebhooksTest(
  args: InferRequestType<typeof client.webhooks.test.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks.test.$post(args, options))
}

/** POST /webhooks/test */
export function getPostWebhooksTestMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['webhooks', '/webhooks/test'] as const,
    async mutationFn(args: InferRequestType<typeof client.webhooks.test.$post>) {
      return postWebhooksTest(args, options)
    },
  }
}

/**
 * POST /webhooks/test
 */
export function createPostWebhooksTest(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postWebhooksTest>>,
      Error,
      InferRequestType<typeof client.webhooks.test.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostWebhooksTestMutationOptions(clientOptions), ...mutation }
  })
}
