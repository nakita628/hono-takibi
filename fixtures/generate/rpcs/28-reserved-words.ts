import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export async function getClass(options?: ClientRequestOptions) {
  return await client.class.$get(undefined, options)
}

/**
 * GET /interface
 */
export async function getInterface(options?: ClientRequestOptions) {
  return await client.interface.$get(undefined, options)
}

/**
 * GET /type
 */
export async function getType(options?: ClientRequestOptions) {
  return await client.type.$get(undefined, options)
}

/**
 * POST /function
 */
export async function postFunction(options?: ClientRequestOptions) {
  return await client.function.$post(undefined, options)
}

/**
 * GET /return
 */
export async function getReturn(options?: ClientRequestOptions) {
  return await client.return.$get(undefined, options)
}

/**
 * GET /import
 */
export async function getImport(options?: ClientRequestOptions) {
  return await client.import.$get(undefined, options)
}

/**
 * GET /export
 */
export async function getExport(options?: ClientRequestOptions) {
  return await client.export.$get(undefined, options)
}

/**
 * GET /default
 */
export async function getDefault(options?: ClientRequestOptions) {
  return await client.default.$get(undefined, options)
}

/**
 * POST /new
 */
export async function postNew(options?: ClientRequestOptions) {
  return await client.new.$post(undefined, options)
}

/**
 * DELETE /delete
 */
export async function deleteDelete(options?: ClientRequestOptions) {
  return await client.delete.$delete(undefined, options)
}

/**
 * GET /void
 */
export async function getVoid(options?: ClientRequestOptions) {
  return await client.void.$get(undefined, options)
}

/**
 * GET /null
 */
export async function getNull(options?: ClientRequestOptions) {
  return await client.null.$get(undefined, options)
}

/**
 * GET /true
 */
export async function getTrue(options?: ClientRequestOptions) {
  return await client.true.$get(undefined, options)
}

/**
 * GET /false
 */
export async function getFalse(options?: ClientRequestOptions) {
  return await client.false.$get(undefined, options)
}

/**
 * GET /if
 */
export async function getIf(options?: ClientRequestOptions) {
  return await client.if.$get(undefined, options)
}

/**
 * GET /else
 */
export async function getElse(options?: ClientRequestOptions) {
  return await client.else.$get(undefined, options)
}

/**
 * GET /for
 */
export async function getFor(options?: ClientRequestOptions) {
  return await client.for.$get(undefined, options)
}

/**
 * GET /while
 */
export async function getWhile(options?: ClientRequestOptions) {
  return await client.while.$get(undefined, options)
}

/**
 * GET /switch
 */
export async function getSwitch(options?: ClientRequestOptions) {
  return await client.switch.$get(undefined, options)
}

/**
 * GET /case
 */
export async function getCase(options?: ClientRequestOptions) {
  return await client.case.$get(undefined, options)
}

/**
 * GET /break
 */
export async function getBreak(options?: ClientRequestOptions) {
  return await client.break.$get(undefined, options)
}

/**
 * GET /continue
 */
export async function getContinue(options?: ClientRequestOptions) {
  return await client.continue.$get(undefined, options)
}

/**
 * GET /try
 */
export async function getTry(options?: ClientRequestOptions) {
  return await client.try.$get(undefined, options)
}

/**
 * GET /catch
 */
export async function getCatch(options?: ClientRequestOptions) {
  return await client.catch.$get(undefined, options)
}

/**
 * GET /finally
 */
export async function getFinally(options?: ClientRequestOptions) {
  return await client.finally.$get(undefined, options)
}

/**
 * GET /throw
 */
export async function getThrow(options?: ClientRequestOptions) {
  return await client.throw.$get(undefined, options)
}

/**
 * GET /async
 */
export async function getAsync(options?: ClientRequestOptions) {
  return await client.async.$get(undefined, options)
}

/**
 * GET /await
 */
export async function getAwait(options?: ClientRequestOptions) {
  return await client.await.$get(undefined, options)
}

/**
 * GET /yield
 */
export async function getYield(options?: ClientRequestOptions) {
  return await client.yield.$get(undefined, options)
}

/**
 * GET /static
 */
export async function getStatic(options?: ClientRequestOptions) {
  return await client.static.$get(undefined, options)
}

/**
 * GET /public
 */
export async function getPublic(options?: ClientRequestOptions) {
  return await client.public.$get(undefined, options)
}

/**
 * GET /private
 */
export async function getPrivate(options?: ClientRequestOptions) {
  return await client.private.$get(undefined, options)
}

/**
 * GET /protected
 */
export async function getProtected(options?: ClientRequestOptions) {
  return await client.protected.$get(undefined, options)
}

/**
 * GET /abstract
 */
export async function getAbstract(options?: ClientRequestOptions) {
  return await client.abstract.$get(undefined, options)
}

/**
 * GET /final
 */
export async function getFinal(options?: ClientRequestOptions) {
  return await client.final.$get(undefined, options)
}

/**
 * GET /extends
 */
export async function getExtends(options?: ClientRequestOptions) {
  return await client.extends.$get(undefined, options)
}

/**
 * GET /implements
 */
export async function getImplements(options?: ClientRequestOptions) {
  return await client.implements.$get(undefined, options)
}

/**
 * GET /package
 */
export async function getPackage(options?: ClientRequestOptions) {
  return await client.package.$get(undefined, options)
}

/**
 * GET /enum
 */
export async function getEnum(options?: ClientRequestOptions) {
  return await client.enum.$get(undefined, options)
}

/**
 * GET /const
 */
export async function getConst(options?: ClientRequestOptions) {
  return await client.const.$get(undefined, options)
}

/**
 * GET /let
 */
export async function getLet(options?: ClientRequestOptions) {
  return await client.let.$get(undefined, options)
}

/**
 * GET /var
 */
export async function getVar(options?: ClientRequestOptions) {
  return await client.var.$get(undefined, options)
}

/**
 * GET /this
 */
export async function getThis(options?: ClientRequestOptions) {
  return await client.this.$get(undefined, options)
}

/**
 * GET /super
 */
export async function getSuper(options?: ClientRequestOptions) {
  return await client.super.$get(undefined, options)
}

/**
 * GET /self
 */
export async function getSelf(options?: ClientRequestOptions) {
  return await client.self.$get(undefined, options)
}

/**
 * GET /constructor
 */
export async function getConstructor(options?: ClientRequestOptions) {
  return await client.constructor.$get(undefined, options)
}

/**
 * GET /prototype
 */
export async function getPrototype(options?: ClientRequestOptions) {
  return await client.prototype.$get(undefined, options)
}

/**
 * GET /toString
 */
export async function getToString(options?: ClientRequestOptions) {
  return await client.toString.$get(undefined, options)
}

/**
 * GET /valueOf
 */
export async function getValueOf(options?: ClientRequestOptions) {
  return await client.valueOf.$get(undefined, options)
}

/**
 * GET /hasOwnProperty
 */
export async function getHasOwnProperty(options?: ClientRequestOptions) {
  return await client.hasOwnProperty.$get(undefined, options)
}

/**
 * GET /name-collisions
 */
export async function getNameCollisions(options?: ClientRequestOptions) {
  return await client['name-collisions'].$get(undefined, options)
}
