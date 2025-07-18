import type { Schema } from '../../../../../openapi/index.js'
import { processAllOf } from './process/process-alllof.js'
import { intersection } from '../../../../zod/z/index.js'

/**
 * Converts an `allOf` schema into a Zod schema.
 * @param { Schema } schema - The OpenAPI schema object.
 * @returns { string } The generated Zod schema as a string.
 */
export function allOf(schema: Schema): string {
  if (!schema.allOf || schema.allOf.length === 0) {
    console.warn('not exists allOf')
    return 'z.any()'
  }

  const { nullable, schemas } = processAllOf(schema.allOf)

  if (schemas.length === 0) {
    return nullable ? 'z.any().nullable()' : 'z.any()'
  }

  if (schemas.length === 1) {
    return nullable ? `${schemas[0]}.nullable()` : schemas[0]
  }

  return `${intersection(schemas)}${nullable ? '.nullable()' : ''}`
}
