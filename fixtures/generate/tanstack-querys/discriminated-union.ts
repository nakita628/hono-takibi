import { useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.messages.$post>,
      variables: InferRequestType<typeof client.messages.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.messages.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.messages.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.messages.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.messages.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
      parseResponse(client.messages.$post(args, clientOptions)),
  })
}
