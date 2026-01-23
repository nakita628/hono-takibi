import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.messages.$post> | undefined,
      Error,
      InferRequestType<typeof client.messages.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostEvents(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.events.$post> | undefined,
      Error,
      InferRequestType<typeof client.events.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetConfigs(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.configs.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetConfigsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.configs.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /configs
 */
export function getGetConfigsQueryKey() {
  return ['/configs'] as const
}

/**
 * PUT /configs
 */
export function usePutConfigs(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.configs.$put> | undefined,
      Error,
      InferRequestType<typeof client.configs.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostResources(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.resources.$post> | undefined,
      Error,
      InferRequestType<typeof client.resources.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostValidations(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.validations.$post> | undefined,
      Error,
      InferRequestType<typeof client.validations.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
