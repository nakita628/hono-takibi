import { makeConst, makeResponses } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component responses.
 *
 * Converts response definitions to JavaScript object constants
 * with content type mappings and schema references.
 *
 *
 * @example
 * ```ts
 * responsesCode(components, true)
 * // → 'export const NotFoundResponse = { description: "Not found", content: {...} }'
 *
 * responsesCode(components, true, true)
 * // → 'export const NotFoundResponse = { description: "Not found", content: {...} } as const'
 * ```
 */
export function responsesCode(
  components: Components,
  exportResponses: boolean,
  readonly?: boolean,
) {
  const { responses } = components
  if (!responses) return ''
  const asConst = readonly ? ' as const' : ''
  return Object.keys(responses)
    .map((k) => {
      const isRef = responses[k].$ref !== undefined
      return `${makeConst(exportResponses, k, 'Response')}${makeResponses(responses[k])}${isRef ? '' : asConst}`
    })
    .join('\n\n')
}
