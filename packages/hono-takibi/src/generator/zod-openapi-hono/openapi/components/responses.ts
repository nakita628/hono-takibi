import type { Components, ResponseDefinition } from '../../../../openapi/index.js'
import { headersPropExpr } from './headers.js'
import { declareConst, resolveComponentKey, responseConstName } from './helpers.js'
import { linksPropExpr } from './links.js'
import { mediaTypeExpr } from './request-bodies.js'

/**
 * Generates a response content property expression.
 */
const responseContentPropExpr = (
  content: ResponseDefinition['content'] | undefined,
  components: Components,
): string | undefined => {
  if (!content) return undefined
  const contentEntries = Object.entries(content).map(([contentType, media]) => {
    return `${JSON.stringify(contentType)}:${mediaTypeExpr(media, components.examples)}`
  })
  return contentEntries.length > 0 ? `content:{${contentEntries.join(',')}}` : undefined
}

/**
 * Generates a response definition expression.
 */
const responseDefinitionExpr = (res: ResponseDefinition, components: Components): string => {
  const resolved =
    typeof res.$ref === 'string'
      ? (() => {
          const key = resolveComponentKey(res.$ref, '#/components/responses/')
          return key ? components.responses?.[key] : undefined
        })()
      : undefined

  const value = resolved ?? res
  const description = `description:${JSON.stringify(value.description ?? '')}`
  const headers = headersPropExpr(value.headers, components)
  const links = linksPropExpr(value.links, components)
  const content = responseContentPropExpr(value.content, components)
  return `{${[description, headers, links, content].filter(Boolean).join(',')}}`
}

/**
 * Generates TypeScript code for OpenAPI component responses.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the response variables.
 * @returns A string of TypeScript code with response definitions.
 */
export function responses(components: Components, exportSchema: boolean): string {
  const { responses } = components
  if (!responses) return ''

  return Object.keys(responses)
    .map((key) => {
      const res = responses[key]
      const expr = res ? responseDefinitionExpr(res, components) : '{}'
      return declareConst(responseConstName(key), expr, exportSchema)
    })
    .join('\n\n')
}
