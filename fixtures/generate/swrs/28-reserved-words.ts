import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export function useGetClass(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.class.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetClassKey() : null)
  const query = useSWR<InferResponseType<typeof client.class.$get>, Error>(
    swrKey,
    async () => parseResponse(client.class.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /class
 */
export function getGetClassKey() {
  return ['GET', '/class'] as const
}

/**
 * GET /interface
 */
export function useGetInterface(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.interface.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetInterfaceKey() : null)
  const query = useSWR<InferResponseType<typeof client.interface.$get>, Error>(
    swrKey,
    async () => parseResponse(client.interface.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /interface
 */
export function getGetInterfaceKey() {
  return ['GET', '/interface'] as const
}

/**
 * GET /type
 */
export function useGetType(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.type.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTypeKey() : null)
  const query = useSWR<InferResponseType<typeof client.type.$get>, Error>(
    swrKey,
    async () => parseResponse(client.type.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /type
 */
export function getGetTypeKey() {
  return ['GET', '/type'] as const
}

/**
 * POST /function
 */
export function usePostFunction(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.function.$post>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.function.$post>, Error, string, void>(
    'POST /function',
    async () => parseResponse(client.function.$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * GET /return
 */
export function useGetReturn(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.return.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetReturnKey() : null)
  const query = useSWR<InferResponseType<typeof client.return.$get>, Error>(
    swrKey,
    async () => parseResponse(client.return.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /return
 */
export function getGetReturnKey() {
  return ['GET', '/return'] as const
}

/**
 * GET /import
 */
export function useGetImport(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.import.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetImportKey() : null)
  const query = useSWR<InferResponseType<typeof client.import.$get>, Error>(
    swrKey,
    async () => parseResponse(client.import.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /import
 */
export function getGetImportKey() {
  return ['GET', '/import'] as const
}

/**
 * GET /export
 */
export function useGetExport(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.export.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetExportKey() : null)
  const query = useSWR<InferResponseType<typeof client.export.$get>, Error>(
    swrKey,
    async () => parseResponse(client.export.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /export
 */
export function getGetExportKey() {
  return ['GET', '/export'] as const
}

/**
 * GET /default
 */
export function useGetDefault(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.default.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDefaultKey() : null)
  const query = useSWR<InferResponseType<typeof client.default.$get>, Error>(
    swrKey,
    async () => parseResponse(client.default.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /default
 */
export function getGetDefaultKey() {
  return ['GET', '/default'] as const
}

/**
 * POST /new
 */
export function usePostNew(options?: {
  swr?: SWRMutationConfiguration<InferResponseType<typeof client.new.$post>, Error, string, void>
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.new.$post>, Error, string, void>(
    'POST /new',
    async () => parseResponse(client.new.$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /delete
 */
export function useDeleteDelete(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.delete.$delete>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.delete.$delete>, Error, string, void>(
    'DELETE /delete',
    async () => parseResponse(client.delete.$delete(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * GET /void
 */
export function useGetVoid(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.void.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetVoidKey() : null)
  const query = useSWR<InferResponseType<typeof client.void.$get>, Error>(
    swrKey,
    async () => parseResponse(client.void.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /void
 */
export function getGetVoidKey() {
  return ['GET', '/void'] as const
}

/**
 * GET /null
 */
export function useGetNull(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.null.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNullKey() : null)
  const query = useSWR<InferResponseType<typeof client.null.$get>, Error>(
    swrKey,
    async () => parseResponse(client.null.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /null
 */
export function getGetNullKey() {
  return ['GET', '/null'] as const
}

/**
 * GET /true
 */
export function useGetTrue(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.true.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTrueKey() : null)
  const query = useSWR<InferResponseType<typeof client.true.$get>, Error>(
    swrKey,
    async () => parseResponse(client.true.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /true
 */
export function getGetTrueKey() {
  return ['GET', '/true'] as const
}

/**
 * GET /false
 */
export function useGetFalse(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.false.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFalseKey() : null)
  const query = useSWR<InferResponseType<typeof client.false.$get>, Error>(
    swrKey,
    async () => parseResponse(client.false.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /false
 */
export function getGetFalseKey() {
  return ['GET', '/false'] as const
}

/**
 * GET /if
 */
export function useGetIf(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.if.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetIfKey() : null)
  const query = useSWR<InferResponseType<typeof client.if.$get>, Error>(
    swrKey,
    async () => parseResponse(client.if.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /if
 */
export function getGetIfKey() {
  return ['GET', '/if'] as const
}

/**
 * GET /else
 */
export function useGetElse(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.else.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetElseKey() : null)
  const query = useSWR<InferResponseType<typeof client.else.$get>, Error>(
    swrKey,
    async () => parseResponse(client.else.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /else
 */
export function getGetElseKey() {
  return ['GET', '/else'] as const
}

/**
 * GET /for
 */
export function useGetFor(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.for.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetForKey() : null)
  const query = useSWR<InferResponseType<typeof client.for.$get>, Error>(
    swrKey,
    async () => parseResponse(client.for.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /for
 */
export function getGetForKey() {
  return ['GET', '/for'] as const
}

/**
 * GET /while
 */
export function useGetWhile(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.while.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWhileKey() : null)
  const query = useSWR<InferResponseType<typeof client.while.$get>, Error>(
    swrKey,
    async () => parseResponse(client.while.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /while
 */
export function getGetWhileKey() {
  return ['GET', '/while'] as const
}

/**
 * GET /switch
 */
export function useGetSwitch(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.switch.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSwitchKey() : null)
  const query = useSWR<InferResponseType<typeof client.switch.$get>, Error>(
    swrKey,
    async () => parseResponse(client.switch.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /switch
 */
export function getGetSwitchKey() {
  return ['GET', '/switch'] as const
}

/**
 * GET /case
 */
export function useGetCase(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.case.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCaseKey() : null)
  const query = useSWR<InferResponseType<typeof client.case.$get>, Error>(
    swrKey,
    async () => parseResponse(client.case.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /case
 */
export function getGetCaseKey() {
  return ['GET', '/case'] as const
}

/**
 * GET /break
 */
export function useGetBreak(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.break.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetBreakKey() : null)
  const query = useSWR<InferResponseType<typeof client.break.$get>, Error>(
    swrKey,
    async () => parseResponse(client.break.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /break
 */
export function getGetBreakKey() {
  return ['GET', '/break'] as const
}

/**
 * GET /continue
 */
export function useGetContinue(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.continue.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetContinueKey() : null)
  const query = useSWR<InferResponseType<typeof client.continue.$get>, Error>(
    swrKey,
    async () => parseResponse(client.continue.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /continue
 */
export function getGetContinueKey() {
  return ['GET', '/continue'] as const
}

/**
 * GET /try
 */
export function useGetTry(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.try.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTryKey() : null)
  const query = useSWR<InferResponseType<typeof client.try.$get>, Error>(
    swrKey,
    async () => parseResponse(client.try.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /try
 */
export function getGetTryKey() {
  return ['GET', '/try'] as const
}

/**
 * GET /catch
 */
export function useGetCatch(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.catch.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCatchKey() : null)
  const query = useSWR<InferResponseType<typeof client.catch.$get>, Error>(
    swrKey,
    async () => parseResponse(client.catch.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /catch
 */
export function getGetCatchKey() {
  return ['GET', '/catch'] as const
}

/**
 * GET /finally
 */
export function useGetFinally(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.finally.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFinallyKey() : null)
  const query = useSWR<InferResponseType<typeof client.finally.$get>, Error>(
    swrKey,
    async () => parseResponse(client.finally.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /finally
 */
export function getGetFinallyKey() {
  return ['GET', '/finally'] as const
}

/**
 * GET /throw
 */
export function useGetThrow(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.throw.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetThrowKey() : null)
  const query = useSWR<InferResponseType<typeof client.throw.$get>, Error>(
    swrKey,
    async () => parseResponse(client.throw.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /throw
 */
export function getGetThrowKey() {
  return ['GET', '/throw'] as const
}

/**
 * GET /async
 */
export function useGetAsync(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.async.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAsyncKey() : null)
  const query = useSWR<InferResponseType<typeof client.async.$get>, Error>(
    swrKey,
    async () => parseResponse(client.async.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /async
 */
export function getGetAsyncKey() {
  return ['GET', '/async'] as const
}

/**
 * GET /await
 */
export function useGetAwait(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.await.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAwaitKey() : null)
  const query = useSWR<InferResponseType<typeof client.await.$get>, Error>(
    swrKey,
    async () => parseResponse(client.await.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /await
 */
export function getGetAwaitKey() {
  return ['GET', '/await'] as const
}

/**
 * GET /yield
 */
export function useGetYield(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.yield.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetYieldKey() : null)
  const query = useSWR<InferResponseType<typeof client.yield.$get>, Error>(
    swrKey,
    async () => parseResponse(client.yield.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /yield
 */
export function getGetYieldKey() {
  return ['GET', '/yield'] as const
}

/**
 * GET /static
 */
export function useGetStatic(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.static.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStaticKey() : null)
  const query = useSWR<InferResponseType<typeof client.static.$get>, Error>(
    swrKey,
    async () => parseResponse(client.static.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /static
 */
export function getGetStaticKey() {
  return ['GET', '/static'] as const
}

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
 * GET /private
 */
export function useGetPrivate(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.private.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPrivateKey() : null)
  const query = useSWR<InferResponseType<typeof client.private.$get>, Error>(
    swrKey,
    async () => parseResponse(client.private.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /private
 */
export function getGetPrivateKey() {
  return ['GET', '/private'] as const
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
 * GET /abstract
 */
export function useGetAbstract(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.abstract.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAbstractKey() : null)
  const query = useSWR<InferResponseType<typeof client.abstract.$get>, Error>(
    swrKey,
    async () => parseResponse(client.abstract.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /abstract
 */
export function getGetAbstractKey() {
  return ['GET', '/abstract'] as const
}

/**
 * GET /final
 */
export function useGetFinal(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.final.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFinalKey() : null)
  const query = useSWR<InferResponseType<typeof client.final.$get>, Error>(
    swrKey,
    async () => parseResponse(client.final.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /final
 */
export function getGetFinalKey() {
  return ['GET', '/final'] as const
}

/**
 * GET /extends
 */
export function useGetExtends(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.extends.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetExtendsKey() : null)
  const query = useSWR<InferResponseType<typeof client.extends.$get>, Error>(
    swrKey,
    async () => parseResponse(client.extends.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /extends
 */
export function getGetExtendsKey() {
  return ['GET', '/extends'] as const
}

/**
 * GET /implements
 */
export function useGetImplements(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.implements.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetImplementsKey() : null)
  const query = useSWR<InferResponseType<typeof client.implements.$get>, Error>(
    swrKey,
    async () => parseResponse(client.implements.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /implements
 */
export function getGetImplementsKey() {
  return ['GET', '/implements'] as const
}

/**
 * GET /package
 */
export function useGetPackage(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.package.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPackageKey() : null)
  const query = useSWR<InferResponseType<typeof client.package.$get>, Error>(
    swrKey,
    async () => parseResponse(client.package.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /package
 */
export function getGetPackageKey() {
  return ['GET', '/package'] as const
}

/**
 * GET /enum
 */
export function useGetEnum(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.enum.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEnumKey() : null)
  const query = useSWR<InferResponseType<typeof client.enum.$get>, Error>(
    swrKey,
    async () => parseResponse(client.enum.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /enum
 */
export function getGetEnumKey() {
  return ['GET', '/enum'] as const
}

/**
 * GET /const
 */
export function useGetConst(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.const.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetConstKey() : null)
  const query = useSWR<InferResponseType<typeof client.const.$get>, Error>(
    swrKey,
    async () => parseResponse(client.const.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /const
 */
export function getGetConstKey() {
  return ['GET', '/const'] as const
}

/**
 * GET /let
 */
export function useGetLet(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.let.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetLetKey() : null)
  const query = useSWR<InferResponseType<typeof client.let.$get>, Error>(
    swrKey,
    async () => parseResponse(client.let.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /let
 */
export function getGetLetKey() {
  return ['GET', '/let'] as const
}

/**
 * GET /var
 */
export function useGetVar(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.var.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetVarKey() : null)
  const query = useSWR<InferResponseType<typeof client.var.$get>, Error>(
    swrKey,
    async () => parseResponse(client.var.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /var
 */
export function getGetVarKey() {
  return ['GET', '/var'] as const
}

/**
 * GET /this
 */
export function useGetThis(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.this.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetThisKey() : null)
  const query = useSWR<InferResponseType<typeof client.this.$get>, Error>(
    swrKey,
    async () => parseResponse(client.this.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /this
 */
export function getGetThisKey() {
  return ['GET', '/this'] as const
}

/**
 * GET /super
 */
export function useGetSuper(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.super.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSuperKey() : null)
  const query = useSWR<InferResponseType<typeof client.super.$get>, Error>(
    swrKey,
    async () => parseResponse(client.super.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /super
 */
export function getGetSuperKey() {
  return ['GET', '/super'] as const
}

/**
 * GET /self
 */
export function useGetSelf(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.self.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSelfKey() : null)
  const query = useSWR<InferResponseType<typeof client.self.$get>, Error>(
    swrKey,
    async () => parseResponse(client.self.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /self
 */
export function getGetSelfKey() {
  return ['GET', '/self'] as const
}

/**
 * GET /constructor
 */
export function useGetConstructor(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.constructor.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetConstructorKey() : null)
  const query = useSWR<InferResponseType<typeof client.constructor.$get>, Error>(
    swrKey,
    async () => parseResponse(client.constructor.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /constructor
 */
export function getGetConstructorKey() {
  return ['GET', '/constructor'] as const
}

/**
 * GET /prototype
 */
export function useGetPrototype(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.prototype.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPrototypeKey() : null)
  const query = useSWR<InferResponseType<typeof client.prototype.$get>, Error>(
    swrKey,
    async () => parseResponse(client.prototype.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /prototype
 */
export function getGetPrototypeKey() {
  return ['GET', '/prototype'] as const
}

/**
 * GET /toString
 */
export function useGetToString(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.toString.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetToStringKey() : null)
  const query = useSWR<InferResponseType<typeof client.toString.$get>, Error>(
    swrKey,
    async () => parseResponse(client.toString.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /toString
 */
export function getGetToStringKey() {
  return ['GET', '/toString'] as const
}

/**
 * GET /valueOf
 */
export function useGetValueOf(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.valueOf.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetValueOfKey() : null)
  const query = useSWR<InferResponseType<typeof client.valueOf.$get>, Error>(
    swrKey,
    async () => parseResponse(client.valueOf.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /valueOf
 */
export function getGetValueOfKey() {
  return ['GET', '/valueOf'] as const
}

/**
 * GET /hasOwnProperty
 */
export function useGetHasOwnProperty(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.hasOwnProperty.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHasOwnPropertyKey() : null)
  const query = useSWR<InferResponseType<typeof client.hasOwnProperty.$get>, Error>(
    swrKey,
    async () => parseResponse(client.hasOwnProperty.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /hasOwnProperty
 */
export function getGetHasOwnPropertyKey() {
  return ['GET', '/hasOwnProperty'] as const
}

/**
 * GET /name-collisions
 */
export function useGetNameCollisions(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['name-collisions']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNameCollisionsKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['name-collisions']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['name-collisions'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /name-collisions
 */
export function getGetNameCollisionsKey() {
  return ['GET', '/name-collisions'] as const
}
