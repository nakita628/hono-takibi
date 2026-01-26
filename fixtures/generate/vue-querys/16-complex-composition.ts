import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.messages.$post>,
      variables: InferRequestType<typeof client.messages.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.messages.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.messages.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.messages.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.messages.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
      parseResponse(client.messages.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.events.$post>,
      variables: InferRequestType<typeof client.events.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.events.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.events.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.events.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.events.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
      parseResponse(client.events.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /configs
 */
export function useGetConfigs(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.configs.$get>
      | (() => InferResponseType<typeof client.configs.$get>)
    initialData?:
      | InferResponseType<typeof client.configs.$get>
      | (() => InferResponseType<typeof client.configs.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetConfigsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.configs.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /configs
 */
export function getGetConfigsQueryKey() {
  return ['/configs'] as const
}

/**
 * Returns Vue Query query options for GET /configs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConfigsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetConfigsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.configs.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /configs
 */
export function usePutConfigs(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.configs.$put>,
      variables: InferRequestType<typeof client.configs.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.configs.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.configs.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.configs.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.configs.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.configs.$put>) =>
      parseResponse(client.configs.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /resources
 */
export function usePostResources(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.resources.$post>,
      variables: InferRequestType<typeof client.resources.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.resources.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.resources.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.resources.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.resources.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.resources.$post>) =>
      parseResponse(client.resources.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /validations
 */
export function usePostValidations(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.validations.$post>,
      variables: InferRequestType<typeof client.validations.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.validations.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.validations.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.validations.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.validations.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.validations.$post>) =>
      parseResponse(client.validations.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
