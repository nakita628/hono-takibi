import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostSchemaEdgeCasesNullableMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.nullable.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.nullable.$post>
  >({
    mutationKey: ['schemaEdgeCases', '/schemaEdgeCases/nullable', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.schemaEdgeCases.nullable.$post>) {
      return parseResponse(client.schemaEdgeCases.nullable.$post(args, options))
    },
  })
}

export function usePostSchemaEdgeCasesNullable<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.nullable.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.nullable.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostSchemaEdgeCasesNullableMutationOptions<TError>(clientOptions),
  })
}
