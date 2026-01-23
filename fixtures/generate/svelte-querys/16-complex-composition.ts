import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function createPostMessages(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.messages.$post> | undefined,
      Error,
      InferRequestType<typeof client.messages.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.messages.$post> | undefined,
    Error,
    InferRequestType<typeof client.messages.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.messages.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /events
 */
export function createPostEvents(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.events.$post> | undefined,
      Error,
      InferRequestType<typeof client.events.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.events.$post> | undefined,
    Error,
    InferRequestType<typeof client.events.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.events.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /configs
 */
export function createGetConfigs(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.configs.$get>, Error>
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
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.configs.$put> | undefined,
      Error,
      InferRequestType<typeof client.configs.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.configs.$put> | undefined,
    Error,
    InferRequestType<typeof client.configs.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.configs.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /resources
 */
export function createPostResources(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.resources.$post> | undefined,
      Error,
      InferRequestType<typeof client.resources.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.resources.$post> | undefined,
    Error,
    InferRequestType<typeof client.resources.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.resources.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /validations
 */
export function createPostValidations(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.validations.$post> | undefined,
      Error,
      InferRequestType<typeof client.validations.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.validations.$post> | undefined,
    Error,
    InferRequestType<typeof client.validations.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.validations.$post(args, options?.client)),
    },
    queryClient,
  )
}
