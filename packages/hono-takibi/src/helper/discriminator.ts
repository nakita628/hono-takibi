import { COMPONENT_REF_PREFIX } from '../constants/index.js'
import { isDiscriminableBranch, isRefOnly } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import { decodePercent } from '../utils/index.js'

/**
 * The branches of a discriminated `oneOf`, resolved, when `z.discriminatedUnion` stands for
 * it; `undefined` when the `oneOf` is emitted as `z.xor`. The two are equivalent only when
 * every branch is a plain object that `required`s the discriminator and pins it to string
 * literals (see `isDiscriminableBranch`), and no two branches share a literal.
 */
export function discriminatedBranches(
  schema: Schema,
  schemas?: { readonly [k: string]: Schema },
): readonly { readonly branch: Schema; readonly name: string | undefined }[] | undefined {
  const discriminator = schema.discriminator?.propertyName
  if (discriminator === undefined || schema.oneOf === undefined || schema.oneOf.length < 2) {
    return undefined
  }
  const resolved = schema.oneOf.map((s) => {
    if (s.$ref === undefined) return { branch: s, name: undefined }
    if (!(isRefOnly(s) && s.$ref.startsWith(COMPONENT_REF_PREFIX.schemas))) return undefined
    const name = decodePercent(s.$ref.slice(COMPONENT_REF_PREFIX.schemas.length))
    const branch = schemas?.[name]
    return branch === undefined ? undefined : { branch, name }
  })
  const literalsPerBranch = resolved.map((entry) => {
    if (entry === undefined || !isDiscriminableBranch(entry.branch, discriminator)) return undefined
    const property = entry.branch.properties?.[discriminator]
    if (property === undefined || typeof property === 'boolean') return undefined
    return typeof property.const === 'string' ? [property.const] : (property.enum ?? [])
  })
  const literals = literalsPerBranch.flatMap((values) => values ?? [])
  const isDiscriminated =
    literalsPerBranch.every((values) => values !== undefined) &&
    new Set(literals).size === literals.length
  return isDiscriminated ? resolved.filter((entry) => entry !== undefined) : undefined
}
