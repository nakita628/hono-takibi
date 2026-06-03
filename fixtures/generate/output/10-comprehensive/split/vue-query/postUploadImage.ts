import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostUploadImageMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.image.$post>) {
      return parseResponse(client.upload.image.$post(args, options))
    },
  }
}

export function usePostUploadImage<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.upload.image.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.upload.image.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostUploadImageMutationOptions(clientOptions) })
}
