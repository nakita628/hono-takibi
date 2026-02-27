import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query mutation key for POST /subscriptions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSubscriptionsMutationKey() {
  return ['subscriptions', 'POST', '/subscriptions'] as const
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

/**
 * Returns Svelte Query mutation options for POST /subscriptions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostSubscriptionsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostSubscriptionsMutationKey(),
    async mutationFn(args: Parameters<typeof postSubscriptions>[0]) {
      return postSubscriptions(args, clientOptions)
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
      Parameters<typeof postSubscriptions>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostSubscriptionsMutationOptions(opts?.client), ...opts?.mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSubscriptionsIdQueryKey(args: Parameters<typeof getSubscriptionsId>[0]) {
  return ['subscriptions', 'GET', '/subscriptions/:id', args] as const
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
 * Returns Svelte Query query options for GET /subscriptions/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSubscriptionsIdQueryOptions(
  args: Parameters<typeof getSubscriptionsId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

/**
 * GET /subscriptions/{id}
 */
export function createGetSubscriptionsId(
  args: Parameters<typeof getSubscriptionsId>[0],
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetSubscriptionsIdQueryOptions(args, opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /subscriptions/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSubscriptionsIdMutationKey() {
  return ['subscriptions', 'DELETE', '/subscriptions/:id'] as const
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

/**
 * Returns Svelte Query mutation options for DELETE /subscriptions/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteSubscriptionsIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteSubscriptionsIdMutationKey(),
    async mutationFn(args: Parameters<typeof deleteSubscriptionsId>[0]) {
      return deleteSubscriptionsId(args, clientOptions)
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
      Parameters<typeof deleteSubscriptionsId>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getDeleteSubscriptionsIdMutationOptions(opts?.client), ...opts?.mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /webhooks/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksTestMutationKey() {
  return ['webhooks', 'POST', '/webhooks/test'] as const
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

/**
 * Returns Svelte Query mutation options for POST /webhooks/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostWebhooksTestMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostWebhooksTestMutationKey(),
    async mutationFn(args: Parameters<typeof postWebhooksTest>[0]) {
      return postWebhooksTest(args, clientOptions)
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
      Parameters<typeof postWebhooksTest>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostWebhooksTestMutationOptions(opts?.client), ...opts?.mutation }
  })
}
