import type { Ref, Schemas } from '../../../openapi/index.js'
import { refSchema } from '../../../utils/index.js'
import { zodToOpenAPI } from '../index.js'

/**
 * Converts an OpenAPI/JSON Schema `array` definition into a Zod schema string.
 *
 * ### Conversion rules
 * ```mermaid
 * flowchart TD
 *   A["array(schema)"] --> B[const item =]
 *   B --> C{schema.items?.$ref}
 *   C -- "Yes" --> D["refSchema(schema.items.$ref)"]
 *   C -- "No"  --> E{schema.items}
 *   E -- "Yes" --> F["zodToOpenAPI(schema.items)"]
 *   E -- "No"  --> G["z.any()"]
 *   D --> B
 *   F --> B
 *   G --> B
 *   B --> I["const z = z.array(${item})"]
 *   I --> J{"typeof schema.minItems === number && typeof schema.maxItems === number"}
 *   J -- "Yes" --> K{"schema.minItems === schema.maxItems"}
 *   K -- "Yes" --> L["${z}.length(${schema.minItems})"]
 *   K -- "No"  --> M["${z}.min(${schema.minItems}).max(${schema.maxItems})"]
 *   J -- "No"  --> N{"typeof schema.minItems === number"}
 *   N -- "Yes" --> O["${z}.min(${schema.minItems})"]
 *   N -- "No"  --> P{"typeof schema.maxItems === number"}
 *   P -- "Yes" --> Q["${z}.max(${schema.maxItems})"]
 *   P -- "No"  --> R[z]
 * ```
 *
 * @param schemas - OpenAPI or JSON Schema object representing an array type.
 *                 - `items` may be a `$ref` or an inline schema.
 *                 - `minItems` / `maxItems` control `.min()`, `.max()`, or `.length()`.
 * @returns Zod schema string for the array, e.g. `z.array(z.string()).min(1).max(5)`.
 *
 * @remarks
 * - Does not currently handle tuple schemas (`items: Schema[]` or `prefixItems`).
 * - Does not handle `uniqueItems`, `contains`, `minContains`, or `maxContains`.
 * - Nullable arrays should be wrapped at a higher level (e.g. via `wrap()`).
 *
 * @example
 * ```ts
 * array({
 *   type: 'array',
 *   items: { type: 'string' },
 *   minItems: 1,
 *   maxItems: 3
 * })
 * // → "z.array(z.string()).min(1).max(3)"
 * ```
 */
export function array(schemas: Schemas): string {
  const isSchemaOrParameterOrHeaderRef = (
    ref: Ref,
  ): ref is
    | `#/components/schemas/${string}`
    | `#/components/parameters/${string}`
    | `#/components/headers/${string}` =>
    ref.startsWith('#/components/schemas/') ||
    ref.startsWith('#/components/parameters/') ||
    ref.startsWith('#/components/headers/')

  const toZod = (schema: Schemas): string => zodToOpenAPI({ schemas: { schema } })

  const item = schemas.items?.$ref
    ? isSchemaOrParameterOrHeaderRef(schemas.items.$ref)
      ? refSchema(schemas.items.$ref)
      : schemas.items
        ? toZod(schemas.items)
        : 'z.any()'
    : schemas.items
      ? toZod(schemas.items)
      : 'z.any()'

  const z = `z.array(${item})`

  if (typeof schemas.minItems === 'number' && typeof schemas.maxItems === 'number') {
    return schemas.minItems === schemas.maxItems
      ? `${z}.length(${schemas.minItems})`
      : `${z}.min(${schemas.minItems}).max(${schemas.maxItems})`
  }
  if (typeof schemas.minItems === 'number') return `${z}.min(${schemas.minItems})`
  if (typeof schemas.maxItems === 'number') return `${z}.max(${schemas.maxItems})`
  return z
}
