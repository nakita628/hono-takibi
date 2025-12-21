import { propertiesSchema } from '../../../helper/properties-schema.js'
import type { Schemas } from '../../../openapi/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * @param schemas - Schema definition.
 * @returns The Zod object schema string.
 */
export function object(schemas: Schemas): string {
  const toZod = (schema: Schemas): string => zodToOpenAPI({ schemas: { schema } })

  // allOf, oneOf, anyOf, not
  if (schemas.oneOf) return toZod(schemas)
  if (schemas.anyOf) return toZod(schemas)
  if (schemas.allOf) return toZod(schemas)
  if (schemas.not) return toZod(schemas)
  if (schemas.additionalProperties) {
    if (typeof schemas.additionalProperties === 'boolean') {
      if (schemas.properties) {
        const s = propertiesSchema(
          schemas.properties,
          Array.isArray(schemas.required) ? schemas.required : [],
        )
        if (schemas.additionalProperties === true) {
          return s.replace('object', 'looseObject')
        }
        if (schemas.additionalProperties === false) {
          return s.replace('object', 'strictObject')
        }
        return s
      }
      const s = 'z.object({})'
      if (schemas.additionalProperties === true) {
        return s.replace('object', 'looseObject')
      }
      if (schemas.additionalProperties === false) {
        return s.replace('object', 'strictObject')
      }
      return s
    }
    const s = toZod(schemas.additionalProperties)
    return `z.record(z.string(),${s})`
  }
  if (schemas.properties) {
    const s = propertiesSchema(
      schemas.properties,
      Array.isArray(schemas.required) ? schemas.required : [],
    )
    if (schemas.additionalProperties === false) {
      return s.replace('object', 'strictObject')
    }
    if (schemas.additionalProperties === true) {
      return s.replace('object', 'looseObject')
    }
    return s
  }
  if (schemas.additionalProperties === false) {
    return 'z.strictObject({})'
  }
  if (schemas.additionalProperties === true) {
    return 'z.looseObject({})'
  }
  return 'z.object({})'
}
