import { useMutation } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export function usePostPathological(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.pathological.$post> | undefined,
    Error,
    InferRequestType<typeof client.pathological.$post>
  >({ mutationFn: async (args) => parseResponse(client.pathological.$post(args, clientOptions)) })
}
