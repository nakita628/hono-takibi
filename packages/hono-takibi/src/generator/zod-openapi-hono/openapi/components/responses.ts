import { makeConst } from '../../../../helper/code.js'
import { makeContent } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function responses(components: Components, exportResponses: boolean): string {
  const { responses } = components
  if (!responses) return ''

  return Object.keys(responses)
    .map((k) => {
      const res = responses[k]

      const content = res.content ? makeContent(res.content) : undefined

      const props = [
        res.summary ? `summary:${JSON.stringify(res.summary)}` : undefined,
        res.description ? `description:${JSON.stringify(res.description)}` : undefined,
        res.content ? `content:{${content}}` : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(',')

      return `${makeConst(exportResponses, k, 'Response')}{${props}}`
    })
    .join('\n\n')
}
