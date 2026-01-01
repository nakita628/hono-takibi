import { constCode } from '../../../../helper/const.js'
import type { Components } from '../../../../openapi/index.js'

export function examples(components: Components, exportExamples: boolean): string {
  const { examples } = components
  if (!examples) return ''

  return Object.keys(examples)
    .map((k) => {
      return `${constCode(exportExamples, k, 'Example')}${JSON.stringify(examples[k])}`
    })
    .join('\n\n')
}
