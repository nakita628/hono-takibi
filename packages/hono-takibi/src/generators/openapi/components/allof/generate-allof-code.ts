import type { Schema } from '../../../../types'
import type { Config } from '../../../../config'
import { generateZodSchema } from '../../../zod/generate-zod-schema'

export function generateAllOfCode(schema: Schema, config: Config): string {
  if (!schema.allOf || schema.allOf.length === 0) {
    console.warn('not exists allOf')
    return 'z.any()'
  }
    const zodSchemas = schema.allOf.map((subSchema) => {
      if (subSchema.$ref) {
        const refParts = subSchema.$ref.split('/')
        const refName = refParts[refParts.length - 1]
        return `${refName}Schema`
      } else {
        return generateZodSchema(config, subSchema)
      }
    })
  
    return `z.intersection(${zodSchemas.join(', ')})`
  }
  