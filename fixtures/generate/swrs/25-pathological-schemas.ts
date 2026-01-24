import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export function usePostPathological(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /pathological',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.pathological.$post> }) =>
      parseResponse(client.pathological.$post(arg, options?.client)),
  )
}
