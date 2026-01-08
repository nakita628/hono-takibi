import { client } from '../clients/28-reserved-words'

/**
 * GET /class
 */
export async function getClass() {
  return await client.class.$get()
}

/**
 * GET /interface
 */
export async function getInterface() {
  return await client.interface.$get()
}

/**
 * GET /type
 */
export async function getType() {
  return await client.type.$get()
}

/**
 * POST /function
 */
export async function postFunction() {
  return await client.function.$post()
}

/**
 * GET /return
 */
export async function getReturn() {
  return await client.return.$get()
}

/**
 * GET /import
 */
export async function getImport() {
  return await client.import.$get()
}

/**
 * GET /export
 */
export async function getExport() {
  return await client.export.$get()
}

/**
 * GET /default
 */
export async function getDefault() {
  return await client.default.$get()
}

/**
 * POST /new
 */
export async function postNew() {
  return await client.new.$post()
}

/**
 * DELETE /delete
 */
export async function deleteDelete() {
  return await client.delete.$delete()
}

/**
 * GET /void
 */
export async function getVoid() {
  return await client.void.$get()
}

/**
 * GET /null
 */
export async function getNull() {
  return await client.null.$get()
}

/**
 * GET /true
 */
export async function getTrue() {
  return await client.true.$get()
}

/**
 * GET /false
 */
export async function getFalse() {
  return await client.false.$get()
}

/**
 * GET /if
 */
export async function getIf() {
  return await client.if.$get()
}

/**
 * GET /else
 */
export async function getElse() {
  return await client.else.$get()
}

/**
 * GET /for
 */
export async function getFor() {
  return await client.for.$get()
}

/**
 * GET /while
 */
export async function getWhile() {
  return await client.while.$get()
}

/**
 * GET /switch
 */
export async function getSwitch() {
  return await client.switch.$get()
}

/**
 * GET /case
 */
export async function getCase() {
  return await client.case.$get()
}

/**
 * GET /break
 */
export async function getBreak() {
  return await client.break.$get()
}

/**
 * GET /continue
 */
export async function getContinue() {
  return await client.continue.$get()
}

/**
 * GET /try
 */
export async function getTry() {
  return await client.try.$get()
}

/**
 * GET /catch
 */
export async function getCatch() {
  return await client.catch.$get()
}

/**
 * GET /finally
 */
export async function getFinally() {
  return await client.finally.$get()
}

/**
 * GET /throw
 */
export async function getThrow() {
  return await client.throw.$get()
}

/**
 * GET /async
 */
export async function getAsync() {
  return await client.async.$get()
}

/**
 * GET /await
 */
export async function getAwait() {
  return await client.await.$get()
}

/**
 * GET /yield
 */
export async function getYield() {
  return await client.yield.$get()
}

/**
 * GET /static
 */
export async function getStatic() {
  return await client.static.$get()
}

/**
 * GET /public
 */
export async function getPublic() {
  return await client.public.$get()
}

/**
 * GET /private
 */
export async function getPrivate() {
  return await client.private.$get()
}

/**
 * GET /protected
 */
export async function getProtected() {
  return await client.protected.$get()
}

/**
 * GET /abstract
 */
export async function getAbstract() {
  return await client.abstract.$get()
}

/**
 * GET /final
 */
export async function getFinal() {
  return await client.final.$get()
}

/**
 * GET /extends
 */
export async function getExtends() {
  return await client.extends.$get()
}

/**
 * GET /implements
 */
export async function getImplements() {
  return await client.implements.$get()
}

/**
 * GET /package
 */
export async function getPackage() {
  return await client.package.$get()
}

/**
 * GET /enum
 */
export async function getEnum() {
  return await client.enum.$get()
}

/**
 * GET /const
 */
export async function getConst() {
  return await client.const.$get()
}

/**
 * GET /let
 */
export async function getLet() {
  return await client.let.$get()
}

/**
 * GET /var
 */
export async function getVar() {
  return await client.var.$get()
}

/**
 * GET /this
 */
export async function getThis() {
  return await client.this.$get()
}

/**
 * GET /super
 */
export async function getSuper() {
  return await client.super.$get()
}

/**
 * GET /self
 */
export async function getSelf() {
  return await client.self.$get()
}

/**
 * GET /constructor
 */
export async function getConstructor() {
  return await client.constructor.$get()
}

/**
 * GET /prototype
 */
export async function getPrototype() {
  return await client.prototype.$get()
}

/**
 * GET /toString
 */
export async function getToString() {
  return await client.toString.$get()
}

/**
 * GET /valueOf
 */
export async function getValueOf() {
  return await client.valueOf.$get()
}

/**
 * GET /hasOwnProperty
 */
export async function getHasOwnProperty() {
  return await client.hasOwnProperty.$get()
}

/**
 * GET /name-collisions
 */
export async function getNameCollisions() {
  return await client['name-collisions']['$get']()
}
