import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCallbacksLinksWebhooksTestMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.webhooks.test.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>
  >({
    mutationKey: ['callbacksLinks', '/callbacksLinks/webhooks/test', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>) {
      return parseResponse(client.callbacksLinks.webhooks.test.$post(args, options))
    },
  })
}

export function usePostCallbacksLinksWebhooksTest<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.webhooks.test.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksLinksWebhooksTestMutationOptions<TError>(clientOptions),
  })
}
