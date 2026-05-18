import type { Components, Content, Schema } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component parameters.
 *
 * @param components - The OpenAPI components object.
 * @param exportParameters - Whether to export the Zod schema variables.
 * @param exportParametersTypes - Whether to export the inferred Zod types.
 * @param readonly - Whether to add `.readonly()` modifier to parameter schemas.
 * @returns A string of TypeScript code with parameter definitions.
 */
export function parametersCode(
  components: Components,
  exportParameters: boolean,
  exportParametersTypes: boolean,
  readonly?: boolean,
) {
  const getSchemaFromContent = (content: Content | undefined): Schema | undefined => {
    if (!content) return undefined
    const firstKey = Object.keys(content)[0]
    if (!firstKey) return undefined
    return content[firstKey]?.schema
  }
  const { parameters } = components
  if (!parameters) return ''
  return Object.keys(parameters)
    .map((k) => {
      const parameter = parameters[k]
      // Handle parameters with content instead of schema (OpenAPI 3.x)
      const schema = parameter.schema ?? getSchemaFromContent(parameter.content)
      // Path/query primitive number/integer get the `coerce` hint so the
      // emitter produces `z.coerce.X().pipe(z.Y()...)` directly. Boolean/date/
      // object/array containers still string-replace post-hoc (out of scope).
      const isStringWire = parameter.in === 'query' || parameter.in === 'path'
      const isPrimitiveNumeric =
        isStringWire && (schema?.type === 'number' || schema?.type === 'integer')
      const baseSchema = schema
        ? zodToOpenAPI(
            schema,
            { parameters: { ...parameter } },
            isPrimitiveNumeric ? { coerce: true } : undefined,
          )
        : 'z.any()'
      const z = isPrimitiveNumeric
        ? baseSchema
        : isStringWire && schema?.type === 'boolean'
          ? baseSchema.replace(/\bz\.boolean\(/g, 'z.stringbool(')
          : isStringWire && schema?.type === 'date'
            ? `z.coerce.${baseSchema.replace('z.', '')}`
            : isStringWire && (schema?.type === 'object' || schema?.type === 'array')
              ? baseSchema
                  .replace(
                    /z\.(int\d*)\(\)((?:\.(?:min|max|gt|lt|positive|negative|nonnegative|nonpositive|multipleOf)\([^)]*\))*)/g,
                    (_: string, type: string, constraints: string) =>
                      `z.coerce.number().pipe(z.${type}()${constraints})`,
                  )
                  .replace(/z\.bigint\(\)/g, 'z.coerce.bigint()')
                  .replace(/z\.number\(\)/g, 'z.coerce.number()')
                  .replace(/z\.boolean\(\)/g, 'z.stringbool()')
                  .replace(/z\.date\(\)/g, 'z.coerce.date()')
              : baseSchema
      return zodToOpenAPISchema(
        toIdentifierPascalCase(ensureSuffix(k, 'ParamsSchema')),
        z,
        exportParameters,
        exportParametersTypes,
        true,
        readonly,
      )
    })
    .join('\n\n')
}
