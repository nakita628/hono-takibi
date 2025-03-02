import type { Schema } from '../../../../../type'
import type { Config } from '../../../../../config'
import { processAllOf } from './process/process-alllof'
import { generateZodIntersection } from '../../../../zod/generate-zod-intersection'

/**
 * Converts an `allOf` schema into a Zod schema.
 *
 * @param schema - The OpenAPI schema object.
 * @param config - The configuration object.
 * @returns The generated Zod schema as a string.
 */
export function generateAllOfCode(schema: Schema, config: Config): string {
  if (!schema.allOf || schema.allOf.length === 0) {
    console.warn('not exists allOf')
    return 'z.any()'
  }

  const { nullable, schemas } = processAllOf(schema.allOf, config)

  if (schemas.length === 0) {
    return nullable ? 'z.any().nullable()' : 'z.any()'
  }

  if (schemas.length === 1) {
    return nullable ? `${schemas[0]}.nullable()` : schemas[0]
  }

  const intersectionSchema = generateZodIntersection(schemas)

  const intersection = `${intersectionSchema}${nullable ? '.nullable()' : ''}`
  return intersection
}
