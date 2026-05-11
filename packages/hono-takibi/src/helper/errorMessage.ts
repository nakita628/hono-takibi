import type { Schema } from '../openapi/index.js'

/**
 * Normalizes the ajv-errors `errorMessage` keyword (string or object form) into
 * the existing `x-*-message` series so generators can stay agnostic of which
 * convention the user wrote.
 *
 * Precedence: `x-*-message` always wins over the corresponding `errorMessage`
 * entry (explicit hono-takibi extension is more specific than the input alias).
 *
 * Object form: per-property `errorMessage.properties[<key>]` and
 * `errorMessage.required[<key>]` are pushed down to each child schema as
 * `x-error-message` / `x-required-message`.
 */
export function normalizeErrorMessage(schema: Schema): Schema {
  const em = schema.errorMessage
  if (em === undefined) return schema

  // Simple form: errorMessage: "msg"
  if (typeof em === 'string') {
    return {
      ...schema,
      'x-error-message': schema['x-error-message'] ?? em,
    }
  }

  // Object form. Message keys all share the `string | undefined` shape, so
  // enumerate them in a union for a type-safe setter.
  type MessageKey =
    | 'x-error-message'
    | 'x-pattern-message'
    | 'x-multipleOf-message'
    | 'x-minimum-message'
    | 'x-maximum-message'
    | 'x-additionalProperties-message'
    | 'x-uniqueItems-message'
    | 'x-const-message'
    | 'x-enum-message'
  type WritableSchema = { -readonly [K in keyof Schema]: Schema[K] }
  const next: WritableSchema = { ...schema }

  const setIfMissing = (key: MessageKey, value: string | undefined) => {
    if (value !== undefined && next[key] === undefined) {
      next[key] = value
    }
  }

  // Schema-level messages
  setIfMissing('x-error-message', em.type ?? em._)
  setIfMissing('x-pattern-message', em.pattern)
  setIfMissing('x-multipleOf-message', em.multipleOf)
  setIfMissing('x-additionalProperties-message', em.additionalProperties)
  setIfMissing('x-uniqueItems-message', em.uniqueItems)
  setIfMissing('x-const-message', em.const)
  setIfMissing('x-enum-message', em.enum)

  // Length / range messages — both string-length and number-range share the same
  // x-minimum-message / x-maximum-message extensions in hono-takibi. Map both
  // ajv-errors keys to the same target.
  const minMsg = em.minimum ?? em.minItems ?? em.minLength
  const maxMsg = em.maximum ?? em.maxItems ?? em.maxLength
  setIfMissing('x-minimum-message', minMsg)
  setIfMissing('x-maximum-message', maxMsg)

  // Per-property messages (errorMessage.properties[key] → child x-error-message)
  if (em.properties && schema.properties) {
    const props: { [k: string]: Schema } = { ...schema.properties }
    for (const [key, msg] of Object.entries(em.properties)) {
      const child = props[key]
      if (child) {
        props[key] = {
          ...child,
          'x-error-message': child['x-error-message'] ?? msg,
        }
      }
    }
    next.properties = props
  }

  // Per-property required messages (errorMessage.required[key] or string)
  if (em.required && schema.properties) {
    const props: { [k: string]: Schema } = { ...(next.properties ?? schema.properties) }
    if (typeof em.required === 'string') {
      for (const key of schema.required ?? []) {
        const child = props[key]
        if (child) {
          props[key] = {
            ...child,
            'x-required-message': child['x-required-message'] ?? em.required,
          }
        }
      }
    } else {
      for (const [key, msg] of Object.entries(em.required)) {
        const child = props[key]
        if (child) {
          props[key] = {
            ...child,
            'x-required-message': child['x-required-message'] ?? msg,
          }
        }
      }
    }
    next.properties = props
  }

  // items message → child schema's x-error-message (when items is a single schema)
  const items = schema.items
  const isSingleItems = (i: typeof items): i is Schema => i !== undefined && !Array.isArray(i)
  if (em.items !== undefined && isSingleItems(items)) {
    next.items = {
      ...items,
      'x-error-message': items['x-error-message'] ?? em.items,
    }
  }

  return next
}
