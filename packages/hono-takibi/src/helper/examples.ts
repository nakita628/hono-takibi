import type { Components, Content } from '../openapi/index.js'
import { ensureSuffix, isRecord, toIdentifierPascalCase } from '../utils/index.js'

type ExampleFields = {
  readonly summary?: unknown
  readonly description?: unknown
  readonly value?: unknown
}

type Imports = {
  readonly examples?: unknown
}

const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

const resolveComponentKey = (ref: string, prefix: string): string | undefined => {
  if (!ref.startsWith(prefix)) return undefined
  return ref.slice(prefix.length)
}

/**
 * Generates an inline example expression from example fields.
 */
export const inlineExampleExpr = (example: ExampleFields): string => {
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
 * Generates an example expression from an example value.
 * Handles $ref resolution and import tracking.
 */
export const exampleExpr = (
  example: unknown,
  components: Components,
  usedExampleKeys: Set<string>,
  imports: Imports | undefined,
): string => {
  if (isRef(example) && example.$ref.startsWith('#/components/examples/')) {
    const key = resolveComponentKey(example.$ref, '#/components/examples/')
    const resolved = key ? components.examples?.[key] : undefined
    if (key && resolved) {
      if (imports?.examples) {
        usedExampleKeys.add(key)
        return toIdentifierPascalCase(ensureSuffix(key, 'Example'))
      }
      return inlineExampleExpr(resolved)
    }
    return `{$ref:${JSON.stringify(example.$ref)}}`
  }
  if (isRecord(example)) return inlineExampleExpr(example)
  return JSON.stringify(example)
}

/**
 * Generates an examples property expression.
 */
export const examplesPropExpr = (
  examples: Content[string]['examples'] | undefined,
  components: Components,
  usedExampleKeys: Set<string>,
  imports: Imports | undefined,
): string | undefined => {
  if (!(examples && Object.keys(examples).length > 0)) return undefined
  const entries = Object.entries(examples).map(([exampleKey, example]) => {
    return `${JSON.stringify(exampleKey)}:${exampleExpr(example, components, usedExampleKeys, imports)}`
  })
  return entries.length > 0 ? `examples:{${entries.join(',')}}` : undefined
}
