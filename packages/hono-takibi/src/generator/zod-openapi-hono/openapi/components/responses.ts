import { makeConst, makeResponses } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function responses(components: Components, exportResponses: boolean): string {
  const { responses } = components
  if (!responses) return ''

  return Object.keys(responses)
    .map((k) => `${makeConst(exportResponses, k, 'Response')}${makeResponses(responses[k])}`)
    .join('\n\n')
}
