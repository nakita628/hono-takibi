import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutCrudRefsPostsIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>) {
      return parseResponse(client.crudRefs.posts[':id'].$put(args, options))
    },
  })
}

export function usePutCrudRefsPostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutCrudRefsPostsIdMutationOptions<TError>(clientOptions),
  })
}
