import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetReadonlyRefUsersIdKey(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
) {
  return ['readonlyRef', '/readonlyRef/users/:id', args] as const
}

export function useGetReadonlyRefUsersId(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.readonlyRef.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetReadonlyRefUsersId(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.readonlyRef.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
