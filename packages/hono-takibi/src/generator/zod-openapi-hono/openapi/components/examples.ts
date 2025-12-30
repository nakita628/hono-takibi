import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../../../../utils/index.js'

export function examples(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  return Object.keys(examples)
    .map((k) => {
      return `${exportExamples ? 'export const' : 'const'} ${toIdentifierPascalCase(ensureSuffix(k, 'Example'))} = ${JSON.stringify(examples[k])}`
    })
    .join('\n\n')
}
