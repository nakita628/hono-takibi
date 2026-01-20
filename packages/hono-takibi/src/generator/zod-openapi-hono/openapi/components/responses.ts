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
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns A string of TypeScript code with response definitions.
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
  readonly?: boolean | undefined,
): string {
  const { responses } = components
  if (!responses) return ''

  const asConst = readonly ? ' as const' : ''
  return Object.keys(responses)
    .map(
      (k) => `${makeConst(exportResponses, k, 'Response')}${makeResponses(responses[k])}${asConst}`,
    )
    .join('\n\n')
}
