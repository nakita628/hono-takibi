import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCrudRefsPostsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.crudRefs.posts.$post>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.crudRefs.posts.$post>) {
      return parseResponse(client.crudRefs.posts.$post(args, options))
    },
  })
}

export function usePostCrudRefsPosts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.crudRefs.posts.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCrudRefsPostsMutationOptions<TError>(clientOptions),
  })
}
