import { makeConst } from '../../../../helper/code.js'
import type { Components } from '../../../../openapi/index.js'

export function examplesCode(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  return Object.keys(examples)
    .map((k) => {
      return `${makeConst(exportExamples, k, 'Example')}${JSON.stringify(examples[k])}`
    })
    .join('\n\n')
}
