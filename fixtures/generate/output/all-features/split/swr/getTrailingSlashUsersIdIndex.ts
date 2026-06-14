import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetTrailingSlashUsersIdIndexKey(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
) {
  return ['trailingSlash', '/trailingSlash/users/:id/', args] as const
}

export function useGetTrailingSlashUsersIdIndex(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trailingSlash.users[':id'].index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashUsersIdIndex(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.trailingSlash.users[':id'].index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
