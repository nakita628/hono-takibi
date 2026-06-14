import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostContentTypesUploadMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.upload.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.upload.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/upload', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.upload.$post>) {
      return parseResponse(client.contentTypes.upload.$post(args, options))
    },
  })
}

export function usePostContentTypesUpload<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.upload.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.upload.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesUploadMutationOptions<TError>(clientOptions),
  })
}
