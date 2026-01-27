import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * Generates Svelte Query mutation key for POST /webhooks
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostWebhooksMutationKey() {
  return ['POST', '/webhooks'] as const
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
export function createPostWebhooks(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
      parseResponse(client.webhooks.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query mutation key for POST /subscriptions
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostSubscriptionsMutationKey() {
  return ['POST', '/subscriptions'] as const
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
export function createPostSubscriptions(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.subscriptions.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.subscriptions.$post>) =>
      parseResponse(client.subscriptions.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query mutation key for POST /jobs
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostJobsMutationKey() {
  return ['POST', '/jobs'] as const
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
export function createPostJobs(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.jobs.$post>>>>>,
    Error,
    InferRequestType<typeof client.jobs.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.jobs.$post>) =>
      parseResponse(client.jobs.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query mutation key for POST /integrations/{integrationId}/sync
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostIntegrationsIntegrationIdSyncMutationKey() {
  return ['POST', '/integrations/:integrationId/sync'] as const
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
export function createPostIntegrationsIntegrationIdSync(options?: {
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    ) => parseResponse(client.integrations[':integrationId'].sync.$post(args, clientOptions)),
  }))
}
