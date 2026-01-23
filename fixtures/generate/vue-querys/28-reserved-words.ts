import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export function useGetClass(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetClassQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.class.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /class
 */
export function getGetClassQueryKey() {
  return ['/class'] as const
}

/**
 * GET /interface
 */
export function useGetInterface(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetInterfaceQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.interface.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /interface
 */
export function getGetInterfaceQueryKey() {
  return ['/interface'] as const
}

/**
 * GET /type
 */
export function useGetType(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTypeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.type.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /type
 */
export function getGetTypeQueryKey() {
  return ['/type'] as const
}

/**
 * POST /function
 */
export function usePostFunction(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.function.$post> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.function.$post(undefined, clientOptions)),
  })
}

/**
 * GET /return
 */
export function useGetReturn(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetReturnQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.return.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /return
 */
export function getGetReturnQueryKey() {
  return ['/return'] as const
}

/**
 * GET /import
 */
export function useGetImport(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetImportQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.import.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /import
 */
export function getGetImportQueryKey() {
  return ['/import'] as const
}

/**
 * GET /export
 */
export function useGetExport(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetExportQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.export.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /export
 */
export function getGetExportQueryKey() {
  return ['/export'] as const
}

/**
 * GET /default
 */
export function useGetDefault(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetDefaultQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.default.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /default
 */
export function getGetDefaultQueryKey() {
  return ['/default'] as const
}

/**
 * POST /new
 */
export function usePostNew(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.new.$post> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.new.$post(undefined, clientOptions)),
  })
}

/**
 * DELETE /delete
 */
export function useDeleteDelete(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.delete.$delete> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.delete.$delete(undefined, clientOptions)),
  })
}

/**
 * GET /void
 */
export function useGetVoid(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetVoidQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.void.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /void
 */
export function getGetVoidQueryKey() {
  return ['/void'] as const
}

/**
 * GET /null
 */
export function useGetNull(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNullQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.null.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /null
 */
export function getGetNullQueryKey() {
  return ['/null'] as const
}

/**
 * GET /true
 */
export function useGetTrue(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTrueQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.true.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /true
 */
export function getGetTrueQueryKey() {
  return ['/true'] as const
}

/**
 * GET /false
 */
export function useGetFalse(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetFalseQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.false.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /false
 */
export function getGetFalseQueryKey() {
  return ['/false'] as const
}

/**
 * GET /if
 */
export function useGetIf(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetIfQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.if.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /if
 */
export function getGetIfQueryKey() {
  return ['/if'] as const
}

/**
 * GET /else
 */
export function useGetElse(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetElseQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.else.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /else
 */
export function getGetElseQueryKey() {
  return ['/else'] as const
}

/**
 * GET /for
 */
export function useGetFor(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetForQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.for.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /for
 */
export function getGetForQueryKey() {
  return ['/for'] as const
}

/**
 * GET /while
 */
export function useGetWhile(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWhileQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.while.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /while
 */
export function getGetWhileQueryKey() {
  return ['/while'] as const
}

/**
 * GET /switch
 */
export function useGetSwitch(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSwitchQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.switch.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /switch
 */
export function getGetSwitchQueryKey() {
  return ['/switch'] as const
}

/**
 * GET /case
 */
export function useGetCase(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCaseQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.case.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /case
 */
export function getGetCaseQueryKey() {
  return ['/case'] as const
}

/**
 * GET /break
 */
export function useGetBreak(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetBreakQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.break.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /break
 */
export function getGetBreakQueryKey() {
  return ['/break'] as const
}

/**
 * GET /continue
 */
export function useGetContinue(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetContinueQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.continue.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /continue
 */
export function getGetContinueQueryKey() {
  return ['/continue'] as const
}

/**
 * GET /try
 */
export function useGetTry(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTryQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.try.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /try
 */
export function getGetTryQueryKey() {
  return ['/try'] as const
}

/**
 * GET /catch
 */
export function useGetCatch(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCatchQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.catch.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /catch
 */
export function getGetCatchQueryKey() {
  return ['/catch'] as const
}

/**
 * GET /finally
 */
export function useGetFinally(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetFinallyQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.finally.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /finally
 */
export function getGetFinallyQueryKey() {
  return ['/finally'] as const
}

/**
 * GET /throw
 */
export function useGetThrow(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetThrowQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.throw.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /throw
 */
export function getGetThrowQueryKey() {
  return ['/throw'] as const
}

/**
 * GET /async
 */
export function useGetAsync(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAsyncQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.async.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /async
 */
export function getGetAsyncQueryKey() {
  return ['/async'] as const
}

/**
 * GET /await
 */
export function useGetAwait(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAwaitQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.await.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /await
 */
export function getGetAwaitQueryKey() {
  return ['/await'] as const
}

/**
 * GET /yield
 */
export function useGetYield(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetYieldQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.yield.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /yield
 */
export function getGetYieldQueryKey() {
  return ['/yield'] as const
}

/**
 * GET /static
 */
export function useGetStatic(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetStaticQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.static.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /static
 */
export function getGetStaticQueryKey() {
  return ['/static'] as const
}

/**
 * GET /public
 */
export function useGetPublic(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPublicQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * GET /private
 */
export function useGetPrivate(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPrivateQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.private.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /private
 */
export function getGetPrivateQueryKey() {
  return ['/private'] as const
}

/**
 * GET /protected
 */
export function useGetProtected(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetProtectedQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * GET /abstract
 */
export function useGetAbstract(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAbstractQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.abstract.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /abstract
 */
export function getGetAbstractQueryKey() {
  return ['/abstract'] as const
}

/**
 * GET /final
 */
export function useGetFinal(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetFinalQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.final.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /final
 */
export function getGetFinalQueryKey() {
  return ['/final'] as const
}

/**
 * GET /extends
 */
export function useGetExtends(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetExtendsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.extends.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /extends
 */
export function getGetExtendsQueryKey() {
  return ['/extends'] as const
}

/**
 * GET /implements
 */
export function useGetImplements(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetImplementsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.implements.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /implements
 */
export function getGetImplementsQueryKey() {
  return ['/implements'] as const
}

/**
 * GET /package
 */
export function useGetPackage(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPackageQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.package.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /package
 */
export function getGetPackageQueryKey() {
  return ['/package'] as const
}

/**
 * GET /enum
 */
export function useGetEnum(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetEnumQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.enum.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /enum
 */
export function getGetEnumQueryKey() {
  return ['/enum'] as const
}

/**
 * GET /const
 */
export function useGetConst(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetConstQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.const.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /const
 */
export function getGetConstQueryKey() {
  return ['/const'] as const
}

/**
 * GET /let
 */
export function useGetLet(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetLetQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.let.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /let
 */
export function getGetLetQueryKey() {
  return ['/let'] as const
}

/**
 * GET /var
 */
export function useGetVar(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetVarQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.var.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /var
 */
export function getGetVarQueryKey() {
  return ['/var'] as const
}

/**
 * GET /this
 */
export function useGetThis(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetThisQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.this.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /this
 */
export function getGetThisQueryKey() {
  return ['/this'] as const
}

/**
 * GET /super
 */
export function useGetSuper(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSuperQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.super.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /super
 */
export function getGetSuperQueryKey() {
  return ['/super'] as const
}

/**
 * GET /self
 */
export function useGetSelf(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSelfQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.self.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /self
 */
export function getGetSelfQueryKey() {
  return ['/self'] as const
}

/**
 * GET /constructor
 */
export function useGetConstructor(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetConstructorQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.constructor.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /constructor
 */
export function getGetConstructorQueryKey() {
  return ['/constructor'] as const
}

/**
 * GET /prototype
 */
export function useGetPrototype(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPrototypeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.prototype.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /prototype
 */
export function getGetPrototypeQueryKey() {
  return ['/prototype'] as const
}

/**
 * GET /toString
 */
export function useGetToString(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetToStringQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.toString.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /toString
 */
export function getGetToStringQueryKey() {
  return ['/toString'] as const
}

/**
 * GET /valueOf
 */
export function useGetValueOf(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetValueOfQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.valueOf.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /valueOf
 */
export function getGetValueOfQueryKey() {
  return ['/valueOf'] as const
}

/**
 * GET /hasOwnProperty
 */
export function useGetHasOwnProperty(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetHasOwnPropertyQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.hasOwnProperty.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /hasOwnProperty
 */
export function getGetHasOwnPropertyQueryKey() {
  return ['/hasOwnProperty'] as const
}

/**
 * GET /name-collisions
 */
export function useGetNameCollisions(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNameCollisionsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['name-collisions'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /name-collisions
 */
export function getGetNameCollisionsQueryKey() {
  return ['/name-collisions'] as const
}
