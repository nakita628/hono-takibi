import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export function useGetEntities(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetEntitiesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.entities.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /entities
 */
export function getGetEntitiesQueryKey() {
  return ['/entities'] as const
}

/**
 * POST /process
 */
export function usePostProcess(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.process.$post>) =>
      parseResponse(client.process.$post(args, clientOptions)),
  })
}

/**
 * GET /graph
 */
export function useGetGraph(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetGraphQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.graph.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /graph
 */
export function getGetGraphQueryKey() {
  return ['/graph'] as const
}

/**
 * POST /transform
 */
export function usePostTransform(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.transform.$post>) =>
      parseResponse(client.transform.$post(args, clientOptions)),
  })
}
