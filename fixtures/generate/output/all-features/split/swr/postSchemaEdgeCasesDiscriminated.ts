import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function usePostSchemaEdgeCasesDiscriminated<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.discriminated.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['schemaEdgeCases', '/schemaEdgeCases/discriminated', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.schemaEdgeCases.discriminated.$post> },
      ) => parseResponse(client.schemaEdgeCases.discriminated.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
