import { makeConst } from '../../../../helper/code.js'
import { makeCallbacks } from '../../../../helper/index.js'
import type { Callbacks, Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component callbacks.
 *
 * Converts callback definitions to JavaScript object constants.
 *
 * @param components - The OpenAPI components object.
 * @param exportCallbacks - Whether to export the callback constants.
 * @returns A string of TypeScript code with callback definitions.
 *
 * @example
 * ```ts
 * callbacksCode(components, true)
 * // → 'export const OnDataCallback = { "{$request.body#/callbackUrl}": {...} }'
 * ```
 */
export function callbacksCode(components: Components, exportCallbacks: boolean): string {
  const { callbacks } = components
  if (!callbacks) return ''

  const isCallbacks = (v: unknown): v is Callbacks =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  return Object.entries(callbacks)
    .map(([k, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return undefined
      const callbackCode = makeCallbacks(callbackOrRef)
      return callbackCode
        ? `${makeConst(exportCallbacks, k, 'Callback')}{${callbackCode}}`
        : undefined
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}
