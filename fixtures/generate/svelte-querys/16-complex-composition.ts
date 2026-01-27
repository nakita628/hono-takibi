import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * Generates Svelte Query mutation key for POST /messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesMutationKey() {
  return ['messages', 'POST', '/messages'] as const
}

/**
 * Returns Svelte Query mutation options for POST /messages
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMessagesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMessagesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
    parseResponse(client.messages.$post(args, clientOptions)),
})

/**
 * POST /messages
 */
export function createPostMessages(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>>,
      Error,
      InferRequestType<typeof client.messages.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMessagesMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /events
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEventsMutationKey() {
  return ['events', 'POST', '/events'] as const
}

/**
 * Returns Svelte Query mutation options for POST /events
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostEventsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostEventsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
    parseResponse(client.events.$post(args, clientOptions)),
})

/**
 * POST /events
 */
export function createPostEvents(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
      Error,
      InferRequestType<typeof client.events.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostEventsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /configs
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetConfigsQueryKey() {
  return ['configs', 'GET', '/configs'] as const
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
 * Generates Svelte Query mutation key for PUT /configs
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutConfigsMutationKey() {
  return ['configs', 'PUT', '/configs'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /configs
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutConfigsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutConfigsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.configs.$put>) =>
    parseResponse(client.configs.$put(args, clientOptions)),
})

/**
 * PUT /configs
 */
export function createPutConfigs(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$put>>>>>,
      Error,
      InferRequestType<typeof client.configs.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutConfigsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /resources
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostResourcesMutationKey() {
  return ['resources', 'POST', '/resources'] as const
}

/**
 * Returns Svelte Query mutation options for POST /resources
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostResourcesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostResourcesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.resources.$post>) =>
    parseResponse(client.resources.$post(args, clientOptions)),
})

/**
 * POST /resources
 */
export function createPostResources(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.resources.$post>>>>>,
      Error,
      InferRequestType<typeof client.resources.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostResourcesMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /validations
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostValidationsMutationKey() {
  return ['validations', 'POST', '/validations'] as const
}

/**
 * Returns Svelte Query mutation options for POST /validations
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostValidationsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostValidationsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.validations.$post>) =>
    parseResponse(client.validations.$post(args, clientOptions)),
})

/**
 * POST /validations
 */
export function createPostValidations(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validations.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.validations.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostValidationsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
