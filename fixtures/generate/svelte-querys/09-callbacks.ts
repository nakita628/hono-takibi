import type { CreateMutationOptions } from '@tanstack/svelte-query'
import { createMutation } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * Generates Svelte Query mutation key for POST /webhooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksMutationKey() {
  return ['webhooks', 'POST', '/webhooks'] as const
}

/**
 * Returns Svelte Query mutation options for POST /webhooks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostWebhooksMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
    parseResponse(client.webhooks.$post(args, clientOptions)),
})

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function createPostWebhooks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
      Error,
      InferRequestType<typeof client.webhooks.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostWebhooksMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

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
export const getPostSubscriptionsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSubscriptionsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.subscriptions.$post>) =>
    parseResponse(client.subscriptions.$post(args, clientOptions)),
})

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
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
 * Generates Svelte Query mutation key for POST /jobs
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostJobsMutationKey() {
  return ['jobs', 'POST', '/jobs'] as const
}

/**
 * Returns Svelte Query mutation options for POST /jobs
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostJobsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostJobsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.jobs.$post>) =>
    parseResponse(client.jobs.$post(args, clientOptions)),
})

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function createPostJobs(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.jobs.$post>>>>>,
      Error,
      InferRequestType<typeof client.jobs.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostJobsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /integrations/{integrationId}/sync
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostIntegrationsIntegrationIdSyncMutationKey() {
  return ['integrations', 'POST', '/integrations/:integrationId/sync'] as const
}

/**
 * Returns Svelte Query mutation options for POST /integrations/{integrationId}/sync
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostIntegrationsIntegrationIdSyncMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostIntegrationsIntegrationIdSyncMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
  ) => parseResponse(client.integrations[':integrationId'].sync.$post(args, clientOptions)),
})

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function createPostIntegrationsIntegrationIdSync(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.integrations)[':integrationId']['sync']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostIntegrationsIntegrationIdSyncMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
