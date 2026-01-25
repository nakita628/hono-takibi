import { useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/22-extreme-validation'

/**
 * POST /validate
 */
export function usePostValidate(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.validate.$post>,
      variables: InferRequestType<typeof client.validate.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.validate.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.validate.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.validate.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.validate.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.validate.$post>) =>
      parseResponse(client.validate.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
