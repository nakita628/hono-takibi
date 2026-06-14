import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostArrayObjectConstraintsConfigMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.config.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.config.$post>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/config', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.config.$post>) {
      return parseResponse(client.arrayObjectConstraints.config.$post(args, options))
    },
  })
}

export function usePostArrayObjectConstraintsConfig<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.config.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.config.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostArrayObjectConstraintsConfigMutationOptions<TError>(clientOptions),
  })
}
