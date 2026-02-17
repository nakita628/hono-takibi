import { makeConst } from '../../../../helper/code.js'
import { makeRequestBody } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component request bodies.
 *
 * Converts request body definitions to JavaScript object constants
 * with content type mappings and schema references.
 *
 * @param components - The OpenAPI components object.
 * @param exportRequestBodies - Whether to export the request body constants.
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns A string of TypeScript code with request body definitions.
 *
 * @example
 * ```ts
 * requestBodiesCode(components, true)
 * // → 'export const UserRequestBody = { content: { "application/json": { schema: UserSchema } } }'
 *
 * requestBodiesCode(components, true, true)
 * // → 'export const UserRequestBody = { content: { "application/json": { schema: UserSchema } } } as const'
 * ```
 */
export function requestBodiesCode(
  components: Components,
  exportRequestBodies: boolean,
  readonly?: boolean | undefined,
): string {
  const requestBodies = components.requestBodies
  if (!requestBodies) return ''

  const asConst = readonly ? ' as const' : ''
  return Object.entries(requestBodies)
    .map(([k, body]) => {
      const isRef = '$ref' in body && body.$ref !== undefined
      return `${makeConst(exportRequestBodies, k, 'RequestBody')}${makeRequestBody(body)}${isRef ? '' : asConst}`
    })
    .join('\n\n')
}
