import type { Components, ResponseDefinition, Schemas } from '../../../../openapi/index.js'
import { isRecord, toIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

const headerConstName = (key: string): string => {
  const base = key.endsWith('HeaderSchema')
    ? key
    : key.endsWith('Header')
      ? `${key}Schema`
      : `${key}HeaderSchema`
  return toIdentifier(base)
}

const stripSchemaSuffix = (name: string): string =>
  name.endsWith('Schema') ? name.slice(0, -'Schema'.length) : name

const headerTypeDecl = (name: string, exportType: boolean): string =>
  exportType ? `\n\nexport type ${stripSchemaSuffix(name)} = z.infer<typeof ${name}>` : ''

const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

const isSchema = (v: unknown): v is Schemas => typeof v === 'object' && v !== null

const resolveComponentKey = ($ref: string, prefix: string): string | undefined => {
  if (!$ref.startsWith(prefix)) return undefined
  const key = $ref.slice(prefix.length)
  return key ? key : undefined
}

/**
 * Generates TypeScript code for OpenAPI component headers.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the header schema variables.
 * @param exportType - Whether to export the inferred header types.
 * @returns A string of TypeScript code with header definitions.
 */
export function headers(
  components: Components,
  exportSchema: boolean,
  exportType: boolean,
): string {
  const { headers } = components
  if (!headers) return ''

  return Object.keys(headers)
    .map((key) => {
      const header = headers[key]
      if (!header) {
        const constName = headerConstName(key)
        return `${declareConst(constName, 'z.any()', exportSchema)}${headerTypeDecl(constName, exportType)}`
      }

      const schema: Schemas = {
        ...(header.schema ?? {}),
        ...(header.description !== undefined &&
        typeof header.description === 'string' &&
        header.schema?.description === undefined
          ? { description: header.description }
          : {}),
      }
      const expr = zodToOpenAPI(schema)
      const constName = headerConstName(key)
      return `${declareConst(constName, expr, exportSchema)}${headerTypeDecl(constName, exportType)}`
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

  const merged: Schemas = {
    ...schema,
    ...(description !== undefined && schema.description === undefined ? { description } : {}),
    ...(example !== undefined && schema.example === undefined ? { example } : {}),
  }
  return zodToOpenAPI(merged)
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
    const resolved =
      isRef(header) && header.$ref.startsWith('#/components/headers/')
        ? (() => {
            const key = resolveComponentKey(header.$ref, '#/components/headers/')
            return key ? components.headers?.[key] : undefined
          })()
        : undefined
    const target = resolved ?? header
    const base = headerSchemaExpr(target)
    return `${JSON.stringify(name)}:${base}`
  })

  return entries.length > 0 ? `headers:z.object({${entries.join(',')}})` : undefined
}
