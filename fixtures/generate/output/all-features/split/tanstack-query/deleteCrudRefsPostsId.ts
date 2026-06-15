import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getDeleteCrudRefsPostsIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>) {
      return parseResponse(client.crudRefs.posts[':id'].$delete(args, options))
    },
  })
}

export function useDeleteCrudRefsPostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteCrudRefsPostsIdMutationOptions<TError>(clientOptions),
  })
}
