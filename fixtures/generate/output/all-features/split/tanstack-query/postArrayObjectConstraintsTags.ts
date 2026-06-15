import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostArrayObjectConstraintsTagsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.tags.$post>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/tags', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.tags.$post>) {
      return parseResponse(client.arrayObjectConstraints.tags.$post(args, options))
    },
  })
}

export function usePostArrayObjectConstraintsTags<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.tags.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostArrayObjectConstraintsTagsMutationOptions<TError>(clientOptions),
  })
}
