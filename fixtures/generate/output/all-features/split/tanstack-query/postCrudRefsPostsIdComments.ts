import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCrudRefsPostsIdCommentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts/:id/comments', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>,
    ) {
      return parseResponse(client.crudRefs.posts[':id'].comments.$post(args, options))
    },
  })
}

export function usePostCrudRefsPostsIdComments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCrudRefsPostsIdCommentsMutationOptions<TError>(clientOptions),
  })
}
