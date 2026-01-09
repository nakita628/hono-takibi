import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export async function getClass(args?: { options?: ClientRequestOptions }) {
  return await client.class.$get(args)
}

/**
 * GET /interface
 */
export async function getInterface(args?: { options?: ClientRequestOptions }) {
  return await client.interface.$get(args)
}

/**
 * GET /type
 */
export async function getType(args?: { options?: ClientRequestOptions }) {
  return await client.type.$get(args)
}

/**
 * POST /function
 */
export async function postFunction(args?: { options?: ClientRequestOptions }) {
  return await client.function.$post(args)
}

/**
 * GET /return
 */
export async function getReturn(args?: { options?: ClientRequestOptions }) {
  return await client.return.$get(args)
}

/**
 * GET /import
 */
export async function getImport(args?: { options?: ClientRequestOptions }) {
  return await client.import.$get(args)
}

/**
 * GET /export
 */
export async function getExport(args?: { options?: ClientRequestOptions }) {
  return await client.export.$get(args)
}

/**
 * GET /default
 */
export async function getDefault(args?: { options?: ClientRequestOptions }) {
  return await client.default.$get(args)
}

/**
 * POST /new
 */
export async function postNew(args?: { options?: ClientRequestOptions }) {
  return await client.new.$post(args)
}

/**
 * DELETE /delete
 */
export async function deleteDelete(args?: { options?: ClientRequestOptions }) {
  return await client.delete.$delete(args)
}

/**
 * GET /void
 */
export async function getVoid(args?: { options?: ClientRequestOptions }) {
  return await client.void.$get(args)
}

/**
 * GET /null
 */
export async function getNull(args?: { options?: ClientRequestOptions }) {
  return await client.null.$get(args)
}

/**
 * GET /true
 */
export async function getTrue(args?: { options?: ClientRequestOptions }) {
  return await client.true.$get(args)
}

/**
 * GET /false
 */
export async function getFalse(args?: { options?: ClientRequestOptions }) {
  return await client.false.$get(args)
}

/**
 * GET /if
 */
export async function getIf(args?: { options?: ClientRequestOptions }) {
  return await client.if.$get(args)
}

/**
 * GET /else
 */
export async function getElse(args?: { options?: ClientRequestOptions }) {
  return await client.else.$get(args)
}

/**
 * GET /for
 */
export async function getFor(args?: { options?: ClientRequestOptions }) {
  return await client.for.$get(args)
}

/**
 * GET /while
 */
export async function getWhile(args?: { options?: ClientRequestOptions }) {
  return await client.while.$get(args)
}

/**
 * GET /switch
 */
export async function getSwitch(args?: { options?: ClientRequestOptions }) {
  return await client.switch.$get(args)
}

/**
 * GET /case
 */
export async function getCase(args?: { options?: ClientRequestOptions }) {
  return await client.case.$get(args)
}

/**
 * GET /break
 */
export async function getBreak(args?: { options?: ClientRequestOptions }) {
  return await client.break.$get(args)
}

/**
 * GET /continue
 */
export async function getContinue(args?: { options?: ClientRequestOptions }) {
  return await client.continue.$get(args)
}

/**
 * GET /try
 */
export async function getTry(args?: { options?: ClientRequestOptions }) {
  return await client.try.$get(args)
}

/**
 * GET /catch
 */
export async function getCatch(args?: { options?: ClientRequestOptions }) {
  return await client.catch.$get(args)
}

/**
 * GET /finally
 */
export async function getFinally(args?: { options?: ClientRequestOptions }) {
  return await client.finally.$get(args)
}

/**
 * GET /throw
 */
export async function getThrow(args?: { options?: ClientRequestOptions }) {
  return await client.throw.$get(args)
}

/**
 * GET /async
 */
export async function getAsync(args?: { options?: ClientRequestOptions }) {
  return await client.async.$get(args)
}

/**
 * GET /await
 */
export async function getAwait(args?: { options?: ClientRequestOptions }) {
  return await client.await.$get(args)
}

/**
 * GET /yield
 */
export async function getYield(args?: { options?: ClientRequestOptions }) {
  return await client.yield.$get(args)
}

/**
 * GET /static
 */
export async function getStatic(args?: { options?: ClientRequestOptions }) {
  return await client.static.$get(args)
}

/**
 * GET /public
 */
export async function getPublic(args?: { options?: ClientRequestOptions }) {
  return await client.public.$get(args)
}

/**
 * GET /private
 */
export async function getPrivate(args?: { options?: ClientRequestOptions }) {
  return await client.private.$get(args)
}

/**
 * GET /protected
 */
export async function getProtected(args?: { options?: ClientRequestOptions }) {
  return await client.protected.$get(args)
}

/**
 * GET /abstract
 */
export async function getAbstract(args?: { options?: ClientRequestOptions }) {
  return await client.abstract.$get(args)
}

/**
 * GET /final
 */
export async function getFinal(args?: { options?: ClientRequestOptions }) {
  return await client.final.$get(args)
}

/**
 * GET /extends
 */
export async function getExtends(args?: { options?: ClientRequestOptions }) {
  return await client.extends.$get(args)
}

/**
 * GET /implements
 */
export async function getImplements(args?: { options?: ClientRequestOptions }) {
  return await client.implements.$get(args)
}

/**
 * GET /package
 */
export async function getPackage(args?: { options?: ClientRequestOptions }) {
  return await client.package.$get(args)
}

/**
 * GET /enum
 */
export async function getEnum(args?: { options?: ClientRequestOptions }) {
  return await client.enum.$get(args)
}

/**
 * GET /const
 */
export async function getConst(args?: { options?: ClientRequestOptions }) {
  return await client.const.$get(args)
}

/**
 * GET /let
 */
export async function getLet(args?: { options?: ClientRequestOptions }) {
  return await client.let.$get(args)
}

/**
 * GET /var
 */
export async function getVar(args?: { options?: ClientRequestOptions }) {
  return await client.var.$get(args)
}

/**
 * GET /this
 */
export async function getThis(args?: { options?: ClientRequestOptions }) {
  return await client.this.$get(args)
}

/**
 * GET /super
 */
export async function getSuper(args?: { options?: ClientRequestOptions }) {
  return await client.super.$get(args)
}

/**
 * GET /self
 */
export async function getSelf(args?: { options?: ClientRequestOptions }) {
  return await client.self.$get(args)
}

/**
 * GET /constructor
 */
export async function getConstructor(args?: { options?: ClientRequestOptions }) {
  return await client.constructor.$get(args)
}

/**
 * GET /prototype
 */
export async function getPrototype(args?: { options?: ClientRequestOptions }) {
  return await client.prototype.$get(args)
}

/**
 * GET /toString
 */
export async function getToString(args?: { options?: ClientRequestOptions }) {
  return await client.toString.$get(args)
}

/**
 * GET /valueOf
 */
export async function getValueOf(args?: { options?: ClientRequestOptions }) {
  return await client.valueOf.$get(args)
}

/**
 * GET /hasOwnProperty
 */
export async function getHasOwnProperty(args?: { options?: ClientRequestOptions }) {
  return await client.hasOwnProperty.$get(args)
}

/**
 * GET /name-collisions
 */
export async function getNameCollisions(args?: { options?: ClientRequestOptions }) {
  return await client['name-collisions']['$get'](args)
}
