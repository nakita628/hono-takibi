import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostDefaultResponseItemsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.items.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.defaultResponse.items.$post>
  >({
    mutationKey: ['defaultResponse', '/defaultResponse/items', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.defaultResponse.items.$post>) {
      return parseResponse(client.defaultResponse.items.$post(args, options))
    },
  })
}

export function usePostDefaultResponseItems<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.items.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.defaultResponse.items.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostDefaultResponseItemsMutationOptions<TError>(clientOptions),
  })
}
