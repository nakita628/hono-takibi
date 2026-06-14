import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostContentTypesJsonMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.json.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.json.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/json', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.json.$post>) {
      return parseResponse(client.contentTypes.json.$post(args, options))
    },
  })
}

export function usePostContentTypesJson<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.json.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.json.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesJsonMutationOptions<TError>(clientOptions),
  })
}
