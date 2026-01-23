import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
  return useMutation<
    InferResponseType<typeof client.process.$post> | undefined,
    Error,
    InferRequestType<typeof client.process.$post>
  >({ mutationFn: async (args) => parseResponse(client.process.$post(args, clientOptions)) })
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
  return useMutation<
    InferResponseType<typeof client.transform.$post> | undefined,
    Error,
    InferRequestType<typeof client.transform.$post>
  >({ mutationFn: async (args) => parseResponse(client.transform.$post(args, clientOptions)) })
}
