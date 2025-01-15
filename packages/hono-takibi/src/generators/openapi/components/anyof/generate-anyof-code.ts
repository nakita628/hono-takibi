import type { Schema } from '../../../../types'
import type { Config } from '../../../../config'
import { generateZodSchema } from '../../../zod/generate-zod-schema'
import { getRefSchemaName } from '../../../../core/schema/references/get-ref-schema-name'

export function generateAnyOfCode(schema: Schema, config: Config): string {
  if (!schema.anyOf || schema.anyOf.length === 0) {
    console.warn('not exists anyOf')
    return 'z.any()'
  }

  const zodSchemas = schema.anyOf.map((subSchema) => {
    subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZodSchema(config, subSchema)
    return generateZodSchema(config, subSchema)
  })

  return `z.union([${zodSchemas.join(', ')}])`
}
