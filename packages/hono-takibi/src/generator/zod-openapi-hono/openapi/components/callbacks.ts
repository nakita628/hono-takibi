import type { Components } from '../../../../openapi/index.js'
import { callbackConstName, declareConst, jsonExpr } from './helpers.js'

/**
 * Generates TypeScript code for OpenAPI component callbacks.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the callback variables.
 * @returns A string of TypeScript code with callback definitions.
 */
export function callbacks(components: Components, exportSchema: boolean): string {
  const { callbacks } = components
  if (!callbacks) return ''

  return Object.keys(callbacks)
    .map((key) => declareConst(callbackConstName(key), jsonExpr(callbacks[key]), exportSchema))
    .join('\n\n')
}
