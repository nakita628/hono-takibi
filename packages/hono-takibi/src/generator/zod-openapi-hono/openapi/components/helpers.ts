import type { Schema } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'

/**
 * Type guard for checking if a value is a non-null object.
 */
export const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null

/**
 * Type guard for checking if a value is a $ref object.
 */
export const isRef = (v: unknown): v is { $ref: string } =>
  isRecord(v) && typeof v.$ref === 'string'

/**
 * Type guard for checking if a value is a Schema object.
 */
export const isSchema = (v: unknown): v is Schema => isRecord(v)

/**
 * Converts a value to a JSON expression string.
 */
export const jsonExpr = (value: unknown): string => JSON.stringify(value) ?? 'undefined'

/**
 * Replaces a suffix in a string with another suffix.
 */
export const replaceSuffix = (name: string, fromSuffix: string, toSuffix: string): string =>
  name.endsWith(fromSuffix)
    ? `${name.slice(0, -fromSuffix.length)}${toSuffix}`
    : `${name}${toSuffix}`

/**
 * Declares a const variable with optional export.
 */
export const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

/**
 * Generates a header const name from a key.
 */
export const headerConstName = (key: string): string => {
  const base = key.endsWith('HeaderSchema')
    ? key
    : key.endsWith('Header')
      ? `${key}Schema`
      : `${key}HeaderSchema`
  return toIdentifier(base)
}

/**
 * Generates a link const name from a key.
 */
export const linkConstName = (key: string): string => toIdentifier(ensureSuffix(key, 'Link'))

/**
 * Generates a callback const name from a key.
 */
export const callbackConstName = (key: string): string =>
  toIdentifier(ensureSuffix(key, 'Callback'))

/**
 * Generates a response const name from a key.
 */
export const responseConstName = (key: string): string =>
  toIdentifier(ensureSuffix(key, 'Response'))

/**
 * Generates a requestBody const name from a key.
 */
export const requestBodyConstName = (key: string): string =>
  toIdentifier(replaceSuffix(key, 'Body', 'RequestBody'))

/**
 * Generates a securityScheme const name from a key.
 */
export const securitySchemeConstName = (key: string): string =>
  toIdentifier(ensureSuffix(key, 'SecurityScheme'))

/**
 * Resolves a component key from a $ref string.
 */
export const resolveComponentKey = ($ref: string, prefix: string): string | undefined => {
  if (!$ref.startsWith(prefix)) return undefined
  const key = $ref.slice(prefix.length)
  return key ? key : undefined
}

/**
 * Generates an inline example expression.
 */
export const inlineExampleExpr = (example: Record<string, unknown>): string => {
  const fields = [
    example.summary !== undefined ? `summary:${JSON.stringify(example.summary)}` : undefined,
    example.description !== undefined
      ? `description:${JSON.stringify(example.description)}`
      : undefined,
    example.value !== undefined ? `value:${JSON.stringify(example.value)}` : undefined,
  ].filter((v) => v !== undefined)
  return `{${fields.join(',')}}`
}

/**
 * Coerces date schemas if needed by adding z.coerce prefix.
 */
export const coerceDateIfNeeded = (schemaExpr: string): string =>
  schemaExpr.includes('z.date()') ? `z.coerce.${schemaExpr.replace('z.', '')}` : schemaExpr
