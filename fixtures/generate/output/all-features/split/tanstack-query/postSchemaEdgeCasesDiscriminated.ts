import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostSchemaEdgeCasesDiscriminatedMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.discriminated.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>
  >({
    mutationKey: ['schemaEdgeCases', '/schemaEdgeCases/discriminated', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>) {
      return parseResponse(client.schemaEdgeCases.discriminated.$post(args, options))
    },
  })
}

export function usePostSchemaEdgeCasesDiscriminated<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.discriminated.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostSchemaEdgeCasesDiscriminatedMutationOptions<TError>(clientOptions),
  })
}
