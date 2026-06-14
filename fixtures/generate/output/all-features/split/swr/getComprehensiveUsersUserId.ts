import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetComprehensiveUsersUserIdKey(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/users/:userId', args] as const
}

export function useGetComprehensiveUsersUserId(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveUsersUserId(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
