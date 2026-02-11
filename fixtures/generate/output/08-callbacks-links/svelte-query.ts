import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Returns Svelte Query mutation options for POST /subscriptions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostSubscriptionsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostSubscriptionsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.subscriptions.$post>) {
      return parseResponse(client.subscriptions.$post(args, clientOptions))
    },
  }
}

/**
 * POST /subscriptions
 */
export function createPostSubscriptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.subscriptions.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.subscriptions.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostSubscriptionsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSubscriptionsIdQueryKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', 'GET', '/subscriptions/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /subscriptions/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSubscriptionsIdQueryOptions(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.subscriptions[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /subscriptions/{id}
 */
export function createGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.subscriptions)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSubscriptionsIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query mutation options for DELETE /subscriptions/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteSubscriptionsIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteSubscriptionsIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>) {
      return parseResponse(client.subscriptions[':id'].$delete(args, clientOptions))
    },
  }
}

/**
 * DELETE /subscriptions/{id}
 */
export function createDeleteSubscriptionsId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.subscriptions)[':id']['$delete']>>
            >
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteSubscriptionsIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
 * Returns Svelte Query mutation options for POST /webhooks/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostWebhooksTestMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostWebhooksTestMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.webhooks.test.$post>) {
      return parseResponse(client.webhooks.test.$post(args, clientOptions))
    },
  }
}

/**
 * POST /webhooks/test
 */
export function createPostWebhooksTest(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.test.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.webhooks.test.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostWebhooksTestMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
