import { makeConst, makeResponses } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component responses.
 *
 * Converts response definitions to JavaScript object constants
 * with content type mappings and schema references.
 *
 * @param components - The OpenAPI components object.
 * @param exportResponses - Whether to export the response constants.
 * @returns A string of TypeScript code with response definitions.
 *
 * @example
 * ```ts
 * responsesCode(components, true)
 * // → 'export const NotFoundResponse = { description: "Not found", content: {...} }'
 * ```
 */
export function responsesCode(components: Components, exportResponses: boolean): string {
  const { responses } = components
  if (!responses) return ''

  return Object.keys(responses)
    .map((k) => `${makeConst(exportResponses, k, 'Response')}${makeResponses(responses[k])}`)
    .join('\n\n')
}
