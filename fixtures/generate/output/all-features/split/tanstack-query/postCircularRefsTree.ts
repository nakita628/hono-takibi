import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCircularRefsTreeMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.circularRefs.tree.$post>
  >({
    mutationKey: ['circularRefs', '/circularRefs/tree', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.circularRefs.tree.$post>) {
      return parseResponse(client.circularRefs.tree.$post(args, options))
    },
  })
}

export function usePostCircularRefsTree<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.circularRefs.tree.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCircularRefsTreeMutationOptions<TError>(clientOptions),
  })
}
