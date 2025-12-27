import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'

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
