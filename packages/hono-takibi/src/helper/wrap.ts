/**
 * Zod schema wrapper with OpenAPI metadata.
 *
 * Wraps generated Zod schemas with OpenAPI-specific metadata
 * like default values, nullable, and custom openapi() properties.
 *
 * ```mermaid
 * flowchart LR
 *   A["Base Zod schema"] --> B["wrap()"]
 *   B --> C["Add .default()"]
 *   C --> D["Add .nullable()"]
 *   D --> E["Add .openapi({...})"]
 *   E --> F["Final schema string"]
 * ```
 *
 * @module helper/wrap
 */
import type { Header, Parameter, Schema } from '../openapi/index.js'
import { makeExamples } from './openapi.js'

/**
 * Wraps a Zod schema string with OpenAPI metadata.
 *
 * Applies default values, nullable modifiers, and OpenAPI-specific
 * properties to a base Zod schema string.
 *
 * ```mermaid
 * flowchart TD
 *   A["wrap(zod, schema, meta)"] --> B{"Has default?"}
 *   B -->|Yes| C["zod.default(value)"]
 *   B -->|No| D["zod"]
 *   C --> E{"Is nullable?"}
 *   D --> E
 *   E -->|Yes| F[".nullable()"]
 *   E -->|No| G["(unchanged)"]
 *   F --> H{"Has openapi props?"}
 *   G --> H
 *   H -->|Yes| I[".openapi({...})"]
 *   H -->|No| J["Return as-is"]
 * ```
 *
 * @param zod - Base Zod schema string (e.g., "z.string()")
 * @param schema - OpenAPI schema with metadata
 * @param meta - Optional parameter/header metadata
 * @returns Wrapped Zod schema string with modifiers
 *
 * @example
 * ```ts
 * wrap('z.string()', { default: 'hello', nullable: true })
 * // → 'z.string().default("hello").nullable()'
 *
 * wrap('z.number()', { description: 'User age' })
 * // → 'z.number().openapi({description:"User age"})'
 * ```
 */
export function wrap(
  zod: string,
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
  },
): string {
  // Properties not supported or causing type issues with zod-to-openapi
  const unsupportedProps = new Set([
    'contains',
    'minContains',
    'maxContains',
    'patternProperties',
    'dependentRequired',
    'dependentSchemas',
    'unevaluatedProperties',
    'unevaluatedItems',
    'if',
    'then',
    'else',
    'prefixItems',
    'propertyNames',
    'contentSchema',
    'contentEncoding',
    'contentMediaType',
    '$schema',
    '$id',
  ])

  // Type guard for objects with 'not' property
  const hasNotProperty = (v: unknown): v is { not: unknown } =>
    typeof v === 'object' && v !== null && 'not' in v

  const filterUnsupportedProps = (obj: unknown): unknown => {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    if (Array.isArray(obj)) {
      return obj.map(filterUnsupportedProps)
    }
    const filtered: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      if (unsupportedProps.has(key)) {
        continue
      }
      // Filter out items if boolean or array (OpenAPI expects SchemaObject | ReferenceObject)
      if (key === 'items' && (typeof value === 'boolean' || Array.isArray(value))) {
        continue
      }
      // Filter out not.not (nested not with boolean)
      if (key === 'not' && hasNotProperty(value) && typeof value.not === 'boolean') {
        continue
      }
      // Convert non-string values in required array to strings (YAML may parse null/true/false as literals)
      if (key === 'required' && Array.isArray(value)) {
        filtered[key] = value.map((v) => (typeof v === 'string' ? v : String(v)))
        continue
      }
      // Skip properties with too many keys to avoid TypeScript overload resolution issues
      if (
        key === 'properties' &&
        typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length > 50
      ) {
        continue
      }
      filtered[key] = filterUnsupportedProps(value)
    }
    return filtered
  }

  const formatLiteral = (v: unknown): string => {
    /* boolean true or false */
    if (typeof v === 'boolean') {
      return `${v}`
    }
    /* number */
    if (typeof v === 'number') {
      if (schema.format === 'int64') {
        return `${v}n`
      }
      if (schema.format === 'bigint') {
        return `BigInt(${v})`
      }
      return `${v}`
    }
    /* date */
    if (schema.type === 'date' && typeof v === 'string') {
      return `new Date(${JSON.stringify(v)})`
    }
    /* string */
    if (typeof v === 'string') {
      return JSON.stringify(v)
    }
    /* other */
    return JSON.stringify(v)
  }

  /* why schema.default !== undefined becasue schema.default === 0  // → falsy */
  const s = schema.default !== undefined ? `${zod}.default(${formatLiteral(schema.default)})` : zod

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  const z = isNullable ? `${s}.nullable()` : s

  // zod method chain already expressed properties (to prevent double management)
  const zodExpressedProps = new Set([
    'type',
    'format',
    'default',
    'minLength',
    'maxLength',
    'minimum',
    'maximum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'pattern',
    'enum',
    'items',
    'minItems',
    'maxItems',
    'properties',
    'additionalProperties',
    'oneOf',
    'anyOf',
    'allOf',
    'multipleOf',
    'uniqueItems',
    'nullable',
    'const',
    '$ref',
  ])

  const baseArgs = Object.fromEntries(
    Object.entries(schema).filter(
      ([k, v]) => !(zodExpressedProps.has(k) || (k === 'required' && typeof v === 'boolean')),
    ),
  )
  const args = filterUnsupportedProps(baseArgs)

  const headerMetaProps = meta?.headers
    ? [
        meta.headers.description
          ? `description:${JSON.stringify(meta.headers.description)}`
          : undefined,
        // meta.headers.required ? `required:${JSON.stringify(meta.headers.required)}` : undefined,
        meta.headers.deprecated
          ? `deprecated:${JSON.stringify(meta.headers.deprecated)}`
          : undefined,
        meta.headers.example ? `example:${JSON.stringify(meta.headers.example)}` : undefined,
        meta.headers.examples ? `examples:${makeExamples(meta.headers.examples)}` : undefined,
        meta.headers.style ? `style:${JSON.stringify(meta.headers.style)}` : undefined,
        meta.headers.explode ? `explode:${JSON.stringify(meta.headers.explode)}` : undefined,
        // meta.headers.schema
        //   ? `schema:${JSON.stringify(meta.headers.schema)}`
        //   : undefined,
        meta.headers.content ? `content:${JSON.stringify(meta.headers.content)}` : undefined,
      ].filter((v) => v !== undefined)
    : []

  const openapiSchema = args ? JSON.stringify(args) : undefined
  // Strip outer braces from JSON object to embed directly in openapi({...}) call
  // e.g. '{"description":"foo"}' → '"description":"foo"'
  // This allows seamless integration with other openapi props like param:...
  // If empty object '{}' becomes '', which is filtered out below
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema

  const openapiProps = [
    meta?.parameters ? `param:${JSON.stringify(meta.parameters)}` : undefined,
    ...headerMetaProps,
    openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
  ].filter((v) => v !== undefined)

  // https://github.com/OAI/OpenAPI-Specification/issues/2385
  if (meta?.parameters || meta?.headers) {
    if (meta?.parameters?.required === true || meta?.headers?.required === true) {
      return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
    }
    return openapiProps.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${openapiProps.join(',')}})`
  }
  // propertiesSchema() check
  return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
}
