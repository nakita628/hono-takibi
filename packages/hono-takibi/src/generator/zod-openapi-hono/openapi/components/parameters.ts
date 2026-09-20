import type { Components } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component parameters.
 */
export function parametersCode(
  components: Components,
  exportParameters: boolean,
  exportParametersTypes: boolean,
  readonly?: boolean,
) {
  const { parameters } = components
  if (!parameters) return ''
  return Object.keys(parameters)
    .map((k) => {
      const parameter = parameters[k]
      // Handle parameters with content instead of schema (OpenAPI 3.x)
      const contentKey = parameter.content ? Object.keys(parameter.content)[0] : undefined
      const schema =
        parameter.schema ?? (contentKey ? parameter.content?.[contentKey]?.schema : undefined)
      // Path/query primitive number/integer get the `coerce` hint so the
      // emitter produces `z.coerce.X().pipe(z.Y()...)` directly. Boolean/date/
      // object/array containers still string-replace post-hoc (out of scope).
      // Query, path, header and cookie values all reach the handler as strings, so a
      // numeric or boolean schema has to coerce before it validates. Only a body arrives
      // already typed.
      const isStringWire =
        parameter.in === 'query' ||
        parameter.in === 'path' ||
        parameter.in === 'header' ||
        parameter.in === 'cookie'
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
          ? baseSchema.replaceAll(/\bz\.boolean\(/gu, 'z.stringbool(')
          : isStringWire && schema?.type === 'date'
            ? `z.coerce.${baseSchema.replace('z.', '')}`
            : isStringWire && (schema?.type === 'object' || schema?.type === 'array')
              ? baseSchema
                  .replaceAll(
                    /z\.((?:int|float)\d*)\(\)((?:\.(?:min|max|gt|lt|positive|negative|nonnegative|nonpositive|multipleOf)\([^)]*\))*)/gu,
                    (_: string, type: string, constraints: string) =>
                      type === 'int'
                        ? `z.coerce.number().int()${constraints}`
                        : // `z.int64()` is a bigint schema, so a number piped into it is
                          // rejected outright — the wire value has to become a bigint first.
                          type === 'int64'
                          ? `z.coerce.bigint().pipe(z.int64()${constraints})`
                          : `z.coerce.number().pipe(z.${type}()${constraints})`,
                  )
                  .replaceAll('z.bigint()', 'z.coerce.bigint()')
                  .replaceAll('z.number()', 'z.coerce.number()')
                  .replaceAll('z.boolean()', 'z.stringbool()')
                  .replaceAll('z.date()', 'z.coerce.date()')
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
