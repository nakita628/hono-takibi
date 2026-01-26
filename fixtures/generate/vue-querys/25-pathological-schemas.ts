import { useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export function usePostPathological(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.pathological.$post>,
      variables: InferRequestType<typeof client.pathological.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.pathological.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.pathological.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.pathological.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.pathological.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.pathological.$post>) =>
      parseResponse(client.pathological.$post(args, clientOptions)),
  })
}
