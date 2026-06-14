import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComprehensiveUploadImageMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.upload.image.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.upload.image.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.upload.image.$post>) {
      return parseResponse(client.comprehensive.upload.image.$post(args, options))
    },
  })
}

export function usePostComprehensiveUploadImage<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.upload.image.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.upload.image.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveUploadImageMutationOptions<TError>(clientOptions),
  })
}
