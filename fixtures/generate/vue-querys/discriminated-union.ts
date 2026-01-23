import { useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

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
