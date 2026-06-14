import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostContentTypesTextMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.text.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.text.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/text', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.text.$post>) {
      return parseResponse(client.contentTypes.text.$post(args, options))
    },
  })
}

export function usePostContentTypesText<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.text.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.text.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesTextMutationOptions<TError>(clientOptions),
  })
}
