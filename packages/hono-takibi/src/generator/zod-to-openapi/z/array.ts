import type { Schema } from '../../../openapi/index.js'
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
 * @param schema - OpenAPI or JSON Schema object representing an array type.
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
export function array(schema: Schema): string {
  const item = schema.items?.$ref
    ? refSchema(schema.items.$ref)
    : schema.items
      ? zodToOpenAPI(schema.items)
      : 'z.any()'

  const z = `z.array(${item})`

  if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
    return schema.minItems === schema.maxItems
      ? `${z}.length(${schema.minItems})`
      : `${z}.min(${schema.minItems}).max(${schema.maxItems})`
  }
  if (typeof schema.minItems === 'number') return `${z}.min(${schema.minItems})`
  if (typeof schema.maxItems === 'number') return `${z}.max(${schema.maxItems})`
  return z
}
