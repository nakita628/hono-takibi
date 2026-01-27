import { useMutation } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * Generates TanStack Query mutation key for POST /webhooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksMutationKey() {
  return ['webhooks', 'POST', '/webhooks'] as const
}

/**
 * Returns TanStack Query mutation options for POST /webhooks
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
export function usePostWebhooks(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostWebhooksMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /subscriptions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSubscriptionsMutationKey() {
  return ['subscriptions', 'POST', '/subscriptions'] as const
}

/**
 * Returns TanStack Query mutation options for POST /subscriptions
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
export function usePostSubscriptions(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.subscriptions.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSubscriptionsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /jobs
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostJobsMutationKey() {
  return ['jobs', 'POST', '/jobs'] as const
}

/**
 * Returns TanStack Query mutation options for POST /jobs
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
export function usePostJobs(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.jobs.$post>>>>>,
    Error,
    InferRequestType<typeof client.jobs.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostJobsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /integrations/{integrationId}/sync
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostIntegrationsIntegrationIdSyncMutationKey() {
  return ['integrations', 'POST', '/integrations/:integrationId/sync'] as const
}

/**
 * Returns TanStack Query mutation options for POST /integrations/{integrationId}/sync
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
export function usePostIntegrationsIntegrationIdSync(options?: {
  mutation?: UseMutationOptions<
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
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostIntegrationsIntegrationIdSyncMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
