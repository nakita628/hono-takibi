import { useMutation } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export function usePostValidate(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.validate.$post> | undefined,
    Error,
    InferRequestType<typeof client.validate.$post>
  >({ mutationFn: async (args) => parseResponse(client.validate.$post(args, clientOptions)) })
}
