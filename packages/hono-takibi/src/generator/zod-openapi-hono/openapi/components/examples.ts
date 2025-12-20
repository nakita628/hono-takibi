import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, isRecord, toIdentifier } from '../../../../utils/index.js'

const jsonExpr = (value: unknown): string => JSON.stringify(value) ?? 'undefined'

const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

/**
 * Generates TypeScript code for OpenAPI component examples.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the example variables.
 * @returns A string of TypeScript code with example definitions.
 */
export function examples(components: Components, exportSchema: boolean): string {
  const { examples } = components
  if (!examples) return ''

  return Object.keys(examples)
    .map((key) =>
      declareConst(
        toIdentifier(ensureSuffix(key, 'Example')),
        jsonExpr(examples[key]),
        exportSchema,
      ),
    )
    .join('\n\n')
}

/**
 * Generates an example expression from an example value.
 */
export const exampleExpr = (example: unknown): string => {
  if (isRef(example)) {
    return `{$ref:${JSON.stringify(example.$ref)}}`
  }
  if (isRecord(example)) return inlineExampleExpr(example)
  return JSON.stringify(example)
}

/**
 * Generates an inline example expression.
 */
const inlineExampleExpr = (example: Record<string, unknown>): string => {
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
 * Generates an examples property expression.
 */
export const examplesPropExpr = (
  examples: Record<string, unknown> | undefined,
): string | undefined => {
  if (!(examples && Object.keys(examples).length > 0)) return undefined
  const entries = Object.entries(examples).map(([exampleKey, example]) => {
    return `${JSON.stringify(exampleKey)}:${exampleExpr(example)}`
  })
  return entries.length > 0 ? `examples:{${entries.join(',')}}` : undefined
}
