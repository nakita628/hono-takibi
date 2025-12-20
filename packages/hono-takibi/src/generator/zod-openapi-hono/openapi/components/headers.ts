import type { Components, ResponseDefinition, Schema } from '../../../../openapi/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'
import {
  declareConst,
  headerConstName,
  isRecord,
  isRef,
  isSchema,
  resolveComponentKey,
} from './helpers.js'

/**
 * Generates TypeScript code for OpenAPI component headers.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the header schema variables.
 * @returns A string of TypeScript code with header definitions.
 */
export function headers(components: Components, exportSchema: boolean): string {
  const { headers } = components
  if (!headers) return ''

  return Object.keys(headers)
    .map((key) => {
      const header = headers[key]
      if (!header) return declareConst(headerConstName(key), 'z.any()', exportSchema)

      const schema: Schema = {
        ...(header.schema ?? {}),
        ...(header.description !== undefined &&
        typeof header.description === 'string' &&
        header.schema?.description === undefined
          ? { description: header.description }
          : {}),
      }
      const expr = zodToOpenAPI(schema)
      return declareConst(headerConstName(key), expr, exportSchema)
    })
    .join('\n\n')
}

/**
 * Generates a header schema expression.
 */
const headerSchemaExpr = (header: unknown): string => {
  if (!isRecord(header)) return 'z.any()'
  const rawSchema = header.schema
  const schema = isSchema(rawSchema) ? rawSchema : {}
  const description = typeof header.description === 'string' ? header.description : undefined
  const example = 'example' in header ? header.example : undefined

  const merged: Schema = {
    ...schema,
    ...(description !== undefined && schema.description === undefined ? { description } : {}),
    ...(example !== undefined && schema.example === undefined ? { example } : {}),
  }
  return zodToOpenAPI(merged)
}

/**
 * Checks if a header should be optional.
 */
const shouldOptional = (header: unknown): boolean => {
  if (!isRecord(header)) return true
  if (header.required === true) return false
  const rawSchema = header.schema
  const schemaDefault = isSchema(rawSchema) ? rawSchema.default : undefined
  return schemaDefault === undefined
}

/**
 * Generates a headers property expression for responses.
 */
export const headersPropExpr = (
  headers: ResponseDefinition['headers'] | undefined,
  components: Components,
): string | undefined => {
  if (!headers) return undefined

  const entries = Object.entries(headers).map(([name, header]) => {
    const schema =
      isRef(header) && header.$ref.startsWith('#/components/headers/')
        ? (() => {
            const key = resolveComponentKey(header.$ref, '#/components/headers/')
            const resolved = key ? components.headers?.[key] : undefined
            if (key && resolved) {
              const base = headerConstName(key)
              return shouldOptional(resolved) ? `${base}.optional()` : base
            }
            return 'z.any().optional()'
          })()
        : (() => {
            const base = headerSchemaExpr(header)
            return shouldOptional(header) ? `${base}.optional()` : base
          })()

    return `${JSON.stringify(name)}:${schema}`
  })

  return entries.length > 0 ? `headers:z.object({${entries.join(',')}})` : undefined
}
