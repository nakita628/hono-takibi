import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function createPostMessages(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
        parseResponse(client.messages.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /events
 */
export function createPostEvents(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
        parseResponse(client.events.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /configs
 */
export function createGetConfigs(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.configs.$get>,
      Error,
      InferResponseType<typeof client.configs.$get>,
      readonly ['/configs']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetConfigsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.configs.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /configs
 */
export function getGetConfigsQueryKey() {
  return ['/configs'] as const
}

/**
 * PUT /configs
 */
export function createPutConfigs(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.configs.$put>) =>
        parseResponse(client.configs.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /resources
 */
export function createPostResources(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.resources.$post>) =>
        parseResponse(client.resources.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /validations
 */
export function createPostValidations(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.validations.$post>) =>
        parseResponse(client.validations.$post(args, options?.client)),
    },
    queryClient,
  )
}
