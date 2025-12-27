import { inlineExampleExpr } from '../../../../helper/examples.js'
import type { Components, Content, Schema } from '../../../../openapi/index.js'
import { isRecord, refSchema, toIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

const coerceDateIfNeeded = (schemaExpr: string): string =>
  schemaExpr.includes('z.date()') ? `z.coerce.${schemaExpr.replace('z.', '')}` : schemaExpr

const requestBodyConstName = (key: string): string => {
  const base = key.endsWith('Body')
    ? `${key.slice(0, -'Body'.length)}RequestBody`
    : `${key}RequestBody`
  return toIdentifier(base)
}

const isSchema = (v: unknown): v is Schema => isRecord(v)
const isMedia = (v: unknown): v is Content[string] => isRecord(v) && isSchema(v.schema)

/**
 * Generates a media type expression.
 */
export const mediaTypeExpr = (media: unknown, options?: { coerceDate?: boolean }): string => {
  if (!isMedia(media)) return '{schema:z.any()}'
  const schema = options?.coerceDate
    ? coerceDateIfNeeded(zodToOpenAPI(media.schema))
    : zodToOpenAPI(media.schema)
  const examples = (() => {
    const exs = media.examples
    if (!(exs && Object.keys(exs).length > 0)) return undefined
    const entries = Object.entries(exs).map(([key, ex]) => {
      const expr = isRecord(ex) ? inlineExampleExpr(ex) : JSON.stringify(ex)
      return `${JSON.stringify(key)}:${expr}`
    })
    return entries.length > 0 ? `examples:{${entries.join(',')}}` : undefined
  })()
  return `{${[`schema:${schema}`, examples].filter(Boolean).join(',')}}`
}

/**
 * Generates TypeScript code for OpenAPI component requestBodies.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the requestBody variables.
 * @returns A string of TypeScript code with requestBody definitions.
 */
export function requestBodies(components: Components, exportRequestBodies: boolean): string {
  const requestBodies = components.requestBodies
  if (!requestBodies) return ''

  const isComponentsRef = (ref: unknown): ref is `#/components/${string}/${string}` =>
    typeof ref === 'string' && ref.startsWith('#/components/')

  return Object.entries(requestBodies)
    .map(([name, body]) => {
      if (body.content) {
        const content = Object.entries(body.content)
          .map(([k, mediaOrReference]) => {
            if ('schema' in mediaOrReference) {
              return `${JSON.stringify(k)}:{schema:${zodToOpenAPI(mediaOrReference.schema)}}`
            }
            if ('$ref' in mediaOrReference && isComponentsRef(mediaOrReference.$ref)) {
              return `${JSON.stringify(k)}:${refSchema(mediaOrReference.$ref)}`
            }
            return undefined
          })
          .filter((v): v is string => v !== undefined)
          .join(',')

        const props = [
          body.description ? `description:${JSON.stringify(body.description)}` : undefined,
          `content:{${content}}`,
          body.required ? `required:${body.required}` : undefined,
        ]
          .filter((v) => v !== undefined)
          .join(',')

        return `${exportRequestBodies ? 'export const' : 'const'} ${requestBodyConstName(name)}={${props}}`
      }
      return undefined
    })
    .join('\n\n')
}
