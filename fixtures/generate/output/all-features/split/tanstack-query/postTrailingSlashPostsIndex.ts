import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostTrailingSlashPostsIndexMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.trailingSlash.posts.index.$post>
  >({
    mutationKey: ['trailingSlash', '/trailingSlash/posts/', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.trailingSlash.posts.index.$post>) {
      return parseResponse(client.trailingSlash.posts.index.$post(args, options))
    },
  })
}

export function usePostTrailingSlashPostsIndex<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.trailingSlash.posts.index.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostTrailingSlashPostsIndexMutationOptions<TError>(clientOptions),
  })
}
