import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function createPostMessages(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>>,
    Error,
    InferRequestType<typeof client.messages.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
      parseResponse(client.messages.$post(args, clientOptions)),
  }))
}

/**
 * POST /events
 */
export function createPostEvents(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
    Error,
    InferRequestType<typeof client.events.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
      parseResponse(client.events.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /configs
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetConfigsQueryKey() {
  return ['configs', '/configs'] as const
}

/**
 * Returns Svelte Query query options for GET /configs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetConfigsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetConfigsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.configs.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /configs
 */
export function createGetConfigs(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetConfigsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * PUT /configs
 */
export function createPutConfigs(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$put>>>>>,
    Error,
    InferRequestType<typeof client.configs.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.configs.$put>) =>
      parseResponse(client.configs.$put(args, clientOptions)),
  }))
}

/**
 * POST /resources
 */
export function createPostResources(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.resources.$post>>>>>,
    Error,
    InferRequestType<typeof client.resources.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.resources.$post>) =>
      parseResponse(client.resources.$post(args, clientOptions)),
  }))
}

/**
 * POST /validations
 */
export function createPostValidations(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validations.$post>>>>>,
    Error,
    InferRequestType<typeof client.validations.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.validations.$post>) =>
      parseResponse(client.validations.$post(args, clientOptions)),
  }))
}
