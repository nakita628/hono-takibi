import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function usePostCallbacksLinksWebhooksTest<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.webhooks.test.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['callbacksLinks', '/callbacksLinks/webhooks/test', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.callbacksLinks.webhooks.test.$post> },
      ) => parseResponse(client.callbacksLinks.webhooks.test.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
