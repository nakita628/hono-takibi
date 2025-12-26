import { makeContent } from '../../../../helper/components.js'
import type { Components, Responses } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifier } from '../../../../utils/index.js'
import { headersPropExpr } from './headers.js'
import { linksPropExpr } from './links.js'
import { mediaTypeExpr } from './request-bodies.js'

const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

const responseConstName = (key: string): string => toIdentifier(ensureSuffix(key, 'Response'))

const resolveComponentKey = ($ref: string, prefix: string): string | undefined => {
  if (!$ref.startsWith(prefix)) return undefined
  const key = $ref.slice(prefix.length)
  return key ? key : undefined
}

/**
 * Generates a response content property expression.
 */
const responseContentPropExpr = (content: Responses['content'] | undefined): string | undefined => {
  if (!content) return undefined
  const contentEntries = Object.entries(content).map(([contentType, media]) => {
    return `${JSON.stringify(contentType)}:${mediaTypeExpr(media)}`
  })
  return contentEntries.length > 0 ? `content:{${contentEntries.join(',')}}` : undefined
}

/**
 * Generates a response definition expression.
 */
const responseDefinitionExpr = (res: Responses, components: Components): string => {
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
  const links = linksPropExpr(value.links)
  const content = responseContentPropExpr(value.content)
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
    .map((k) => {
      const res = responses[k]

      const content = res.content ? makeContent(res.content) : undefined

      const props = [
        res.summary ? `summary:${JSON.stringify(res.summary)}` : undefined,
        res.description ? `description:${JSON.stringify(res.description)}` : undefined,
        res.content ? `content:{${content}}` : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(',')

      return `${exportSchema ? 'export const' : 'const'} ${responseConstName(k)}={${props}}`
    })
    .join('\n\n')

  // console.log(JSON.stringify(responses, null, 2))

  // return Object.keys(responses)
  //   .map((key) => {
  //     const res = responses[key]
  //     const expr = res ? responseDefinitionExpr(res, components) : '{}'
  //     return declareConst(responseConstName(key), expr, exportSchema)
  //   })
  //   .join('\n\n')
}
