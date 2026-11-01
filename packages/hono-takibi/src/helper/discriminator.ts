import { COMPONENT_REF_PREFIX } from '../constants/index.js'
import { isDiscriminableBranch, isRefOnly } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import { decodePercent } from '../utils/index.js'
import { resolveSchemaRef } from './wire.js'

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

/**
 * The parent's own object, when an `allOf` member names a parent that lists its subtypes
 * in a `oneOf` / `anyOf` whose members `allOf`-extend it back (a discriminator parent of the
 * MongoDB Atlas kind, #402); `undefined` for any other member. Emitted as the component, the
 * member would name the parent as a whole, which names the subtypes, which name the parent:
 * a cycle that never ends at runtime and that TypeScript cannot type. What a subtype inherits
 * is the parent's `properties` and `required`, so the member stands for those alone.
 */
export function inheritedBase(
  member: Schema,
  schemas?: { readonly [k: string]: Schema },
): Schema | undefined {
  if (!isRefOnly(member) || member.$ref === undefined) return undefined
  const parent = resolveSchemaRef(member.$ref, schemas)
  if (parent === undefined) return undefined
  const branches = parent.oneOf ?? parent.anyOf
  if (branches === undefined) return undefined
  const isExtendedBack = branches.some((branch) => {
    const subtype = branch.$ref === undefined ? branch : resolveSchemaRef(branch.$ref, schemas)
    return subtype?.allOf?.some((part) => part.$ref === member.$ref) ?? false
  })
  if (!isExtendedBack) return undefined
  return {
    type: 'object',
    ...(parent.properties === undefined ? {} : { properties: parent.properties }),
    ...(parent.required === undefined ? {} : { required: parent.required }),
  }
}
