import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'

const jsonExpr = (value: unknown): string => JSON.stringify(value) ?? 'undefined'

const declareConst = (name: string, expr: string, exportCallbacks: boolean): string =>
  `${exportCallbacks ? 'export const' : 'const'} ${name} = ${expr}`

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isRef = (value: unknown): value is { $ref: string } =>
  isRecord(value) && typeof value.$ref === 'string'

const isIdentifier = (value: string): boolean => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)

const propKeyExpr = (key: string): string => (isIdentifier(key) ? key : jsonExpr(key))

const requestBodyConstName = (key: string): string => {
  const base = key.endsWith('Body')
    ? `${key.slice(0, -'Body'.length)}RequestBody`
    : `${key}RequestBody`
  return toIdentifier(base)
}

const responseConstName = (key: string): string => toIdentifier(ensureSuffix(key, 'Response'))

const callbackConstName = (key: string): string => {
  const base = key.endsWith('Callbacks')
    ? key
    : key.endsWith('Callback')
      ? `${key}s`
      : `${key}Callbacks`
  return toIdentifier(base)
}

const valueExpr = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map((item) => valueExpr(item)).join(',')}]`
  }
  if (!isRecord(value)) return jsonExpr(value)
  const entries = Object.entries(value).map(
    ([key, entryValue]) => `${propKeyExpr(key)}:${valueExpr(entryValue)}`,
  )
  return `{${entries.join(',')}}`
}

const requestBodyExpr = (value: unknown, components: Components): string => {
  if (isRef(value) && value.$ref.startsWith('#/components/requestBodies/')) {
    const key = value.$ref.split('/').pop()
    const resolved = key ? components.requestBodies?.[key] : undefined
    if (key && resolved) return requestBodyConstName(key)
  }
  return valueExpr(value)
}

const responsesExpr = (value: unknown, components: Components): string => {
  if (!isRecord(value)) return valueExpr(value)
  const entries = Object.entries(value).map(([code, responseValue]) => {
    if (isRef(responseValue) && responseValue.$ref.startsWith('#/components/responses/')) {
      const key = responseValue.$ref.split('/').pop()
      const resolved = key ? components.responses?.[key] : undefined
      if (key && resolved) return `${propKeyExpr(code)}:${responseConstName(key)}`
    }
    return `${propKeyExpr(code)}:${valueExpr(responseValue)}`
  })
  return `{${entries.join(',')}}`
}

const operationExpr = (value: unknown, components: Components): string => {
  if (!isRecord(value)) return valueExpr(value)
  const entries = Object.entries(value).map(([key, entryValue]) => {
    if (key === 'requestBody') {
      return `requestBody:${requestBodyExpr(entryValue, components)}`
    }
    if (key === 'responses') {
      return `responses:${responsesExpr(entryValue, components)}`
    }
    return `${propKeyExpr(key)}:${valueExpr(entryValue)}`
  })
  return `{${entries.join(',')}}`
}

const pathItemExpr = (value: unknown, components: Components): string => {
  if (!isRecord(value)) return valueExpr(value)
  const entries = Object.entries(value).map(
    ([key, entryValue]) => `${propKeyExpr(key)}:${operationExpr(entryValue, components)}`,
  )
  return `{${entries.join(',')}}`
}

const callbackExpr = (value: unknown, components: Components): string => {
  if (!isRecord(value)) return valueExpr(value)
  const entries = Object.entries(value).map(
    ([key, entryValue]) => `${propKeyExpr(key)}:${pathItemExpr(entryValue, components)}`,
  )
  return `{${entries.join(',')}}`
}

/**
 * Generates TypeScript code for OpenAPI component callbacks.
 *
 * @param components - The OpenAPI components object.
 * @param exportCallbacks - Whether to export the callback variables.
 * @returns A string of TypeScript code with callback definitions.
 */
export function callbacks(components: Components, exportCallbacks: boolean): string {
  const { callbacks } = components
  if (!callbacks) return ''

  return Object.keys(callbacks)
    .map((key) =>
      declareConst(
        callbackConstName(key),
        callbackExpr(callbacks[key], components),
        exportCallbacks,
      ),
    )
    .join('\n\n')
}
