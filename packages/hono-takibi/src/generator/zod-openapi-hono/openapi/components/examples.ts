import { inlineExampleExpr } from '../../../../helper/examples.js'
import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, isRecord, toIdentifier } from '../../../../utils/index.js'

const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

/**
 * Generates TypeScript code for OpenAPI component examples.
 *
 * @param components - The OpenAPI components object.
 * @param exportExamples - Whether to export the example variables.
 * @returns A string of TypeScript code with example definitions.
 */
export function examples(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  return Object.keys(examples)
    .map((k) => {
      return `${exportExamples ? 'export const' : 'const'} ${toIdentifier(ensureSuffix(k, 'Example'))} = ${JSON.stringify(examples[k])}`
    })
    .join('\n\n')
}

/**
 * Generates an example expression from an example value (simple version without $ref resolution).
 */
export const exampleExpr = (example: unknown): string => {
  if (isRef(example)) {
    return `{$ref:${JSON.stringify(example.$ref)}}`
  }
  if (isRecord(example)) return inlineExampleExpr(example)
  return JSON.stringify(example)
}

/**
 * Generates an examples property expression (simple version without $ref resolution).
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
