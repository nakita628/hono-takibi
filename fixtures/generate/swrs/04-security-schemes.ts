import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function useGetPublic(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.public.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPublicKey() : null)
  const query = useSWR<InferResponseType<typeof client.public.$get>, Error>(
    swrKey,
    async () => parseResponse(client.public.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /public
 */
export function getGetPublicKey() {
  return ['GET', '/public'] as const
}

/**
 * GET /protected
 */
export function useGetProtected(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.protected.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProtectedKey() : null)
  const query = useSWR<InferResponseType<typeof client.protected.$get>, Error>(
    swrKey,
    async () => parseResponse(client.protected.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /protected
 */
export function getGetProtectedKey() {
  return ['GET', '/protected'] as const
}

/**
 * GET /admin
 */
export function useGetAdmin(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.admin.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAdminKey() : null)
  const query = useSWR<InferResponseType<typeof client.admin.$get>, Error>(
    swrKey,
    async () => parseResponse(client.admin.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /admin
 */
export function getGetAdminKey() {
  return ['GET', '/admin'] as const
}

/**
 * GET /oauth-resource
 */
export function useGetOauthResource(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['oauth-resource']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauthResourceKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['oauth-resource']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['oauth-resource'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /oauth-resource
 */
export function getGetOauthResourceKey() {
  return ['GET', '/oauth-resource'] as const
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['multi-auth']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMultiAuthKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['multi-auth']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['multi-auth'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /multi-auth
 */
export function getGetMultiAuthKey() {
  return ['GET', '/multi-auth'] as const
}
