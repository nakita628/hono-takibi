import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export async function getClass(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.class.$get(args, options)
}

/**
 * GET /interface
 */
export async function getInterface(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.interface.$get(args, options)
}

/**
 * GET /type
 */
export async function getType(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.type.$get(args, options)
}

/**
 * POST /function
 */
export async function postFunction(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.function.$post(args, options)
}

/**
 * GET /return
 */
export async function getReturn(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.return.$get(args, options)
}

/**
 * GET /import
 */
export async function getImport(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.import.$get(args, options)
}

/**
 * GET /export
 */
export async function getExport(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.export.$get(args, options)
}

/**
 * GET /default
 */
export async function getDefault(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.default.$get(args, options)
}

/**
 * POST /new
 */
export async function postNew(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.new.$post(args, options)
}

/**
 * DELETE /delete
 */
export async function deleteDelete(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.delete.$delete(args, options)
}

/**
 * GET /void
 */
export async function getVoid(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.void.$get(args, options)
}

/**
 * GET /null
 */
export async function getNull(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.null.$get(args, options)
}

/**
 * GET /true
 */
export async function getTrue(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.true.$get(args, options)
}

/**
 * GET /false
 */
export async function getFalse(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.false.$get(args, options)
}

/**
 * GET /if
 */
export async function getIf(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.if.$get(args, options)
}

/**
 * GET /else
 */
export async function getElse(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.else.$get(args, options)
}

/**
 * GET /for
 */
export async function getFor(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.for.$get(args, options)
}

/**
 * GET /while
 */
export async function getWhile(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.while.$get(args, options)
}

/**
 * GET /switch
 */
export async function getSwitch(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.switch.$get(args, options)
}

/**
 * GET /case
 */
export async function getCase(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.case.$get(args, options)
}

/**
 * GET /break
 */
export async function getBreak(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.break.$get(args, options)
}

/**
 * GET /continue
 */
export async function getContinue(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.continue.$get(args, options)
}

/**
 * GET /try
 */
export async function getTry(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.try.$get(args, options)
}

/**
 * GET /catch
 */
export async function getCatch(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.catch.$get(args, options)
}

/**
 * GET /finally
 */
export async function getFinally(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.finally.$get(args, options)
}

/**
 * GET /throw
 */
export async function getThrow(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.throw.$get(args, options)
}

/**
 * GET /async
 */
export async function getAsync(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.async.$get(args, options)
}

/**
 * GET /await
 */
export async function getAwait(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.await.$get(args, options)
}

/**
 * GET /yield
 */
export async function getYield(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.yield.$get(args, options)
}

/**
 * GET /static
 */
export async function getStatic(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.static.$get(args, options)
}

/**
 * GET /public
 */
export async function getPublic(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.public.$get(args, options)
}

/**
 * GET /private
 */
export async function getPrivate(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.private.$get(args, options)
}

/**
 * GET /protected
 */
export async function getProtected(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.protected.$get(args, options)
}

/**
 * GET /abstract
 */
export async function getAbstract(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.abstract.$get(args, options)
}

/**
 * GET /final
 */
export async function getFinal(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.final.$get(args, options)
}

/**
 * GET /extends
 */
export async function getExtends(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.extends.$get(args, options)
}

/**
 * GET /implements
 */
export async function getImplements(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.implements.$get(args, options)
}

/**
 * GET /package
 */
export async function getPackage(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.package.$get(args, options)
}

/**
 * GET /enum
 */
export async function getEnum(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.enum.$get(args, options)
}

/**
 * GET /const
 */
export async function getConst(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.const.$get(args, options)
}

/**
 * GET /let
 */
export async function getLet(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.let.$get(args, options)
}

/**
 * GET /var
 */
export async function getVar(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.var.$get(args, options)
}

/**
 * GET /this
 */
export async function getThis(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.this.$get(args, options)
}

/**
 * GET /super
 */
export async function getSuper(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.super.$get(args, options)
}

/**
 * GET /self
 */
export async function getSelf(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.self.$get(args, options)
}

/**
 * GET /constructor
 */
export async function getConstructor(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.constructor.$get(args, options)
}

/**
 * GET /prototype
 */
export async function getPrototype(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.prototype.$get(args, options)
}

/**
 * GET /toString
 */
export async function getToString(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.toString.$get(args, options)
}

/**
 * GET /valueOf
 */
export async function getValueOf(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.valueOf.$get(args, options)
}

/**
 * GET /hasOwnProperty
 */
export async function getHasOwnProperty(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.hasOwnProperty.$get(args, options)
}

/**
 * GET /name-collisions
 */
export async function getNameCollisions(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['name-collisions']['$get'](args, options)
}
