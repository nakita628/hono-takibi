import type { Schema } from '../../../openapi/index.js'
import { getToSafeIdentifier } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Generates a Zod object schema from an OpenAPI schema definition.
 *
 * @param schema - Schema definition.
 * @returns The Zod object schema string.
 */
export function object(schema: Schema): string {
  const propertiesSchema = (
    properties: { readonly [k: string]: Schema },
    required: readonly string[],
  ) => {
    const objectProperties = Object.entries(properties).map(([key, schema]) => {
      const isRequired = required.includes(key)
      const z = zodToOpenAPI(schema)
      const safeKey = getToSafeIdentifier(key)
      if (isRequired) {
        return `${safeKey}:${z}`
      }
      // .exactOptional() insert before .openapi()
      // example: z.string().openapi({...}) → z.string().exactOptional().openapi({...})
      const optionalZ = z.includes('.openapi(')
        ? z.replace('.openapi(', '.exactOptional().openapi(')
        : `${z}.exactOptional()`
      return `${safeKey}:${optionalZ}`
    })
    // const objectProperties = Object.entries(properties).map(([key, schema]) => {
    //   const isRequired = required.includes(key)
    //   const z = zodToOpenAPI(schema)
    //   const safeKey = getToSafeIdentifier(key)

    //   if (isRequired) {
    //     return `${safeKey}:${z}`
    //   }
    //   const openapiIndex = z.lastIndexOf('.openapi(')
    //   const optionalZ =
    //     openapiIndex === -1
    //       ? `${z}.exactOptional()`
    //       : `${z.slice(0, openapiIndex)}.exactOptional()${z.slice(openapiIndex)}`

    //   return `${safeKey}:${optionalZ}`
    // })

    // const allOptional = objectProperties.every((v) => v.includes('.optional()'))
    // // If all properties are optional and no required properties, return partial schema
    // if (required.length === 0 && allOptional) {
    //   const cleanProperties = objectProperties.map((v) => v.replace('.optional()', ''))
    //   return `z.object({${cleanProperties}}).partial()`
    // }
    return `z.object({${objectProperties}})`
  }

  // allOf, oneOf, anyOf, not
  if (schema.oneOf) return zodToOpenAPI(schema)
  if (schema.anyOf) return zodToOpenAPI(schema)
  if (schema.allOf) return zodToOpenAPI(schema)
  if (schema.not) return zodToOpenAPI(schema)
  if (schema.additionalProperties) {
    if (typeof schema.additionalProperties === 'boolean') {
      if (schema.properties) {
        const s = propertiesSchema(
          schema.properties,
          Array.isArray(schema.required) ? schema.required : [],
        )
        if (schema.additionalProperties === true) {
          return s.replace('object', 'looseObject')
        }
        if (schema.additionalProperties === false) {
          return s.replace('object', 'strictObject')
        }
        return s
      }
      const s = 'z.object({})'
      if (schema.additionalProperties === true) {
        return s.replace('object', 'looseObject')
      }
      if (schema.additionalProperties === false) {
        return s.replace('object', 'strictObject')
      }
      return s
    }
    const s = zodToOpenAPI(schema.additionalProperties)
    return `z.record(z.string(),${s})`
  }
  if (schema.properties) {
    const s = propertiesSchema(
      schema.properties,
      Array.isArray(schema.required) ? schema.required : [],
    )
    if (schema.additionalProperties === false) {
      return s.replace('object', 'strictObject')
    }
    if (schema.additionalProperties === true) {
      return s.replace('object', 'looseObject')
    }
    return s
  }
  if (schema.additionalProperties === false) {
    return 'z.strictObject({})'
  }
  if (schema.additionalProperties === true) {
    return 'z.looseObject({})'
  }
  return 'z.object({})'
}
