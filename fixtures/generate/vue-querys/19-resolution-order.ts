import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export function useGetEntities(options?: {
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
    select?: (
      data: InferResponseType<typeof client.entities.$get>,
    ) => InferResponseType<typeof client.entities.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetEntitiesQueryKey(),
    queryFn: async () => parseResponse(client.entities.$get(undefined, clientOptions)),
    ...queryOptions,
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
export function usePostProcess(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.process.$post>,
      variables: InferRequestType<typeof client.process.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.process.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.process.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.process.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.process.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.process.$post>) =>
      parseResponse(client.process.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /graph
 */
export function useGetGraph(options?: {
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
    select?: (
      data: InferResponseType<typeof client.graph.$get>,
    ) => InferResponseType<typeof client.graph.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGraphQueryKey(),
    queryFn: async () => parseResponse(client.graph.$get(undefined, clientOptions)),
    ...queryOptions,
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
export function usePostTransform(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.transform.$post>,
      variables: InferRequestType<typeof client.transform.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.transform.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.transform.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.transform.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.transform.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.transform.$post>) =>
      parseResponse(client.transform.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
