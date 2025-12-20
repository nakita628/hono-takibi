import type { Components, Content, RequestBody } from '../../../../openapi/index.js'
import { toIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'
import { examplesPropExpr } from './examples.js'

const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

const coerceDateIfNeeded = (schemaExpr: string): string =>
  schemaExpr.includes('z.date()') ? `z.coerce.${schemaExpr.replace('z.', '')}` : schemaExpr

const requestBodyConstName = (key: string): string => {
  const base = key.endsWith('Body')
    ? `${key.slice(0, -'Body'.length)}RequestBody`
    : `${key}RequestBody`
  return toIdentifier(base)
}

/**
 * Generates a media type expression.
 */
export const mediaTypeExpr = (
  media: Content[string],
  options?: { coerceDate?: boolean },
): string => {
  const schema = options?.coerceDate
    ? coerceDateIfNeeded(zodToOpenAPI(media.schema))
    : zodToOpenAPI(media.schema)
  const examples = examplesPropExpr(media.examples)
  return `{${[`schema:${schema}`, examples].filter(Boolean).join(',')}}`
}

/**
 * Generates a requestBody expression.
 */
const requestBodyExpr = (body: RequestBody): string => {
  const required = body.required ?? false
  const description =
    body.description !== undefined ? `description:${JSON.stringify(body.description)}` : undefined
  const content = body.content
  if (!content) {
    return `{${[description, `required:${required}`].filter(Boolean).join(',')}}`
  }

  const contentEntries = Object.entries(content).map(([contentType, media]) => {
    return `${JSON.stringify(contentType)}:${mediaTypeExpr(media, { coerceDate: true })}`
  })
  const contentExpr = `content:{${contentEntries.join(',')}}`
  return `{${[description, `required:${required}`, contentExpr].filter(Boolean).join(',')}}`
}

/**
 * Generates TypeScript code for OpenAPI component requestBodies.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the requestBody variables.
 * @returns A string of TypeScript code with requestBody definitions.
 */
export function requestBodies(components: Components, exportSchema: boolean): string {
  const { requestBodies } = components
  if (!requestBodies) return ''

  return Object.keys(requestBodies)
    .map((key) => {
      const body = requestBodies[key]
      const expr = body ? requestBodyExpr(body) : '{}'
      return declareConst(requestBodyConstName(key), expr, exportSchema)
    })
    .join('\n\n')
}
