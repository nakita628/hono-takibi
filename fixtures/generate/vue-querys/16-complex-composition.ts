import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.messages.$post> | undefined,
    Error,
    InferRequestType<typeof client.messages.$post>
  >({ mutationFn: async (args) => parseResponse(client.messages.$post(args, clientOptions)) })
}

/**
 * POST /events
 */
export function usePostEvents(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.events.$post> | undefined,
    Error,
    InferRequestType<typeof client.events.$post>
  >({ mutationFn: async (args) => parseResponse(client.events.$post(args, clientOptions)) })
}

/**
 * GET /configs
 */
export function useGetConfigs(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetConfigsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.configs.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /configs
 */
export function getGetConfigsQueryKey() {
  return ['/configs'] as const
}

/**
 * PUT /configs
 */
export function usePutConfigs(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.configs.$put> | undefined,
    Error,
    InferRequestType<typeof client.configs.$put>
  >({ mutationFn: async (args) => parseResponse(client.configs.$put(args, clientOptions)) })
}

/**
 * POST /resources
 */
export function usePostResources(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.resources.$post> | undefined,
    Error,
    InferRequestType<typeof client.resources.$post>
  >({ mutationFn: async (args) => parseResponse(client.resources.$post(args, clientOptions)) })
}

/**
 * POST /validations
 */
export function usePostValidations(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.validations.$post> | undefined,
    Error,
    InferRequestType<typeof client.validations.$post>
  >({ mutationFn: async (args) => parseResponse(client.validations.$post(args, clientOptions)) })
}
