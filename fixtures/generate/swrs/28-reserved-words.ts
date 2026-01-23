import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export function useGetClass(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.class.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/class'] as const) : null
  return useSWR<InferResponseType<typeof client.class.$get>, Error>(
    key,
    async () => parseResponse(client.class.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.interface.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/interface'] as const) : null
  return useSWR<InferResponseType<typeof client.interface.$get>, Error>(
    key,
    async () => parseResponse(client.interface.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.type.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/type'] as const) : null
  return useSWR<InferResponseType<typeof client.type.$get>, Error>(
    key,
    async () => parseResponse(client.type.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.return.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/return'] as const) : null
  return useSWR<InferResponseType<typeof client.return.$get>, Error>(
    key,
    async () => parseResponse(client.return.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.import.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/import'] as const) : null
  return useSWR<InferResponseType<typeof client.import.$get>, Error>(
    key,
    async () => parseResponse(client.import.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.export.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/export'] as const) : null
  return useSWR<InferResponseType<typeof client.export.$get>, Error>(
    key,
    async () => parseResponse(client.export.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.default.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/default'] as const) : null
  return useSWR<InferResponseType<typeof client.default.$get>, Error>(
    key,
    async () => parseResponse(client.default.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.void.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/void'] as const) : null
  return useSWR<InferResponseType<typeof client.void.$get>, Error>(
    key,
    async () => parseResponse(client.void.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.null.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/null'] as const) : null
  return useSWR<InferResponseType<typeof client.null.$get>, Error>(
    key,
    async () => parseResponse(client.null.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.true.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/true'] as const) : null
  return useSWR<InferResponseType<typeof client.true.$get>, Error>(
    key,
    async () => parseResponse(client.true.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.false.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/false'] as const) : null
  return useSWR<InferResponseType<typeof client.false.$get>, Error>(
    key,
    async () => parseResponse(client.false.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.if.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/if'] as const) : null
  return useSWR<InferResponseType<typeof client.if.$get>, Error>(
    key,
    async () => parseResponse(client.if.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.else.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/else'] as const) : null
  return useSWR<InferResponseType<typeof client.else.$get>, Error>(
    key,
    async () => parseResponse(client.else.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.for.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/for'] as const) : null
  return useSWR<InferResponseType<typeof client.for.$get>, Error>(
    key,
    async () => parseResponse(client.for.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.while.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/while'] as const) : null
  return useSWR<InferResponseType<typeof client.while.$get>, Error>(
    key,
    async () => parseResponse(client.while.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.switch.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/switch'] as const) : null
  return useSWR<InferResponseType<typeof client.switch.$get>, Error>(
    key,
    async () => parseResponse(client.switch.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.case.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/case'] as const) : null
  return useSWR<InferResponseType<typeof client.case.$get>, Error>(
    key,
    async () => parseResponse(client.case.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.break.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/break'] as const) : null
  return useSWR<InferResponseType<typeof client.break.$get>, Error>(
    key,
    async () => parseResponse(client.break.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.continue.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/continue'] as const) : null
  return useSWR<InferResponseType<typeof client.continue.$get>, Error>(
    key,
    async () => parseResponse(client.continue.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.try.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/try'] as const) : null
  return useSWR<InferResponseType<typeof client.try.$get>, Error>(
    key,
    async () => parseResponse(client.try.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.catch.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/catch'] as const) : null
  return useSWR<InferResponseType<typeof client.catch.$get>, Error>(
    key,
    async () => parseResponse(client.catch.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.finally.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/finally'] as const) : null
  return useSWR<InferResponseType<typeof client.finally.$get>, Error>(
    key,
    async () => parseResponse(client.finally.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.throw.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/throw'] as const) : null
  return useSWR<InferResponseType<typeof client.throw.$get>, Error>(
    key,
    async () => parseResponse(client.throw.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.async.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/async'] as const) : null
  return useSWR<InferResponseType<typeof client.async.$get>, Error>(
    key,
    async () => parseResponse(client.async.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.await.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/await'] as const) : null
  return useSWR<InferResponseType<typeof client.await.$get>, Error>(
    key,
    async () => parseResponse(client.await.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.yield.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/yield'] as const) : null
  return useSWR<InferResponseType<typeof client.yield.$get>, Error>(
    key,
    async () => parseResponse(client.yield.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.static.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/static'] as const) : null
  return useSWR<InferResponseType<typeof client.static.$get>, Error>(
    key,
    async () => parseResponse(client.static.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.public.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/public'] as const) : null
  return useSWR<InferResponseType<typeof client.public.$get>, Error>(
    key,
    async () => parseResponse(client.public.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.private.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/private'] as const) : null
  return useSWR<InferResponseType<typeof client.private.$get>, Error>(
    key,
    async () => parseResponse(client.private.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.protected.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/protected'] as const) : null
  return useSWR<InferResponseType<typeof client.protected.$get>, Error>(
    key,
    async () => parseResponse(client.protected.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.abstract.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/abstract'] as const) : null
  return useSWR<InferResponseType<typeof client.abstract.$get>, Error>(
    key,
    async () => parseResponse(client.abstract.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.final.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/final'] as const) : null
  return useSWR<InferResponseType<typeof client.final.$get>, Error>(
    key,
    async () => parseResponse(client.final.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.extends.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/extends'] as const) : null
  return useSWR<InferResponseType<typeof client.extends.$get>, Error>(
    key,
    async () => parseResponse(client.extends.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.implements.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/implements'] as const) : null
  return useSWR<InferResponseType<typeof client.implements.$get>, Error>(
    key,
    async () => parseResponse(client.implements.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.package.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/package'] as const) : null
  return useSWR<InferResponseType<typeof client.package.$get>, Error>(
    key,
    async () => parseResponse(client.package.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.enum.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/enum'] as const) : null
  return useSWR<InferResponseType<typeof client.enum.$get>, Error>(
    key,
    async () => parseResponse(client.enum.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.const.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/const'] as const) : null
  return useSWR<InferResponseType<typeof client.const.$get>, Error>(
    key,
    async () => parseResponse(client.const.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.let.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/let'] as const) : null
  return useSWR<InferResponseType<typeof client.let.$get>, Error>(
    key,
    async () => parseResponse(client.let.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.var.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/var'] as const) : null
  return useSWR<InferResponseType<typeof client.var.$get>, Error>(
    key,
    async () => parseResponse(client.var.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.this.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/this'] as const) : null
  return useSWR<InferResponseType<typeof client.this.$get>, Error>(
    key,
    async () => parseResponse(client.this.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.super.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/super'] as const) : null
  return useSWR<InferResponseType<typeof client.super.$get>, Error>(
    key,
    async () => parseResponse(client.super.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.self.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/self'] as const) : null
  return useSWR<InferResponseType<typeof client.self.$get>, Error>(
    key,
    async () => parseResponse(client.self.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.constructor.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/constructor'] as const) : null
  return useSWR<InferResponseType<typeof client.constructor.$get>, Error>(
    key,
    async () => parseResponse(client.constructor.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.prototype.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/prototype'] as const) : null
  return useSWR<InferResponseType<typeof client.prototype.$get>, Error>(
    key,
    async () => parseResponse(client.prototype.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.toString.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/toString'] as const) : null
  return useSWR<InferResponseType<typeof client.toString.$get>, Error>(
    key,
    async () => parseResponse(client.toString.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.valueOf.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/valueOf'] as const) : null
  return useSWR<InferResponseType<typeof client.valueOf.$get>, Error>(
    key,
    async () => parseResponse(client.valueOf.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<typeof client.hasOwnProperty.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/hasOwnProperty'] as const) : null
  return useSWR<InferResponseType<typeof client.hasOwnProperty.$get>, Error>(
    key,
    async () => parseResponse(client.hasOwnProperty.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['name-collisions']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/name-collisions'] as const) : null
  return useSWR<InferResponseType<(typeof client)['name-collisions']['$get']>, Error>(
    key,
    async () => parseResponse(client['name-collisions'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /name-collisions
 */
export function getGetNameCollisionsKey() {
  return ['GET', '/name-collisions'] as const
}
