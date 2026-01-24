import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export function usePostMessages(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
      parseResponse(client.messages.$post(args, clientOptions)),
  })
}

/**
 * POST /events
 */
export function usePostEvents(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
      parseResponse(client.events.$post(args, clientOptions)),
  })
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.configs.$put>) =>
      parseResponse(client.configs.$put(args, clientOptions)),
  })
}

/**
 * POST /resources
 */
export function usePostResources(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.resources.$post>) =>
      parseResponse(client.resources.$post(args, clientOptions)),
  })
}

/**
 * POST /validations
 */
export function usePostValidations(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.validations.$post>) =>
      parseResponse(client.validations.$post(args, clientOptions)),
  })
}
