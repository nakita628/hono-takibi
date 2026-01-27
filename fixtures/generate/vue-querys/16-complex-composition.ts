import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.messages.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
      parseResponse(client.messages.$post(args, clientOptions)),
  })
}

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
        Error,
        InferRequestType<typeof client.events.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
      parseResponse(client.events.$post(args, clientOptions)),
  })
}

/**
 * GET /configs
 */
export function useGetConfigs(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetConfigsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /configs
 * Uses $url() for type-safe key generation
 */
export function getGetConfigsQueryKey() {
  return [client.configs.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /configs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConfigsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetConfigsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$put>>>>>,
        Error,
        InferRequestType<typeof client.configs.$put>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.configs.$put>) =>
      parseResponse(client.configs.$put(args, clientOptions)),
  })
}

/**
 * POST /resources
 */
export function usePostResources(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.resources.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.resources.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.resources.$post>) =>
      parseResponse(client.resources.$post(args, clientOptions)),
  })
}

/**
 * POST /validations
 */
export function usePostValidations(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validations.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.validations.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.validations.$post>) =>
      parseResponse(client.validations.$post(args, clientOptions)),
  })
}
