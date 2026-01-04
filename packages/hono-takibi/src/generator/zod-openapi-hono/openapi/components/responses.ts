import { zodToOpenAPI } from '../../../../generator/zod-to-openapi/index.js'
import { makeConst } from '../../../../helper/code.js'
import { makeContent, makeLinkOrReference, makeRef } from '../../../../helper/index.js'
import type { Components, Header, Reference, Responses } from '../../../../openapi/index.js'

/**
 * Build a single header schema code from Header or Reference.
 */
function makeHeaderSchema(header: Header | Reference): string {
  if ('$ref' in header && header.$ref) {
    return makeRef(header.$ref)
  }
  if ('schema' in header && header.schema) {
    return zodToOpenAPI(header.schema, { headers: header })
  }
  return 'z.any()'
}

/**
 * Build headers as z.object({...}) from multiple headers.
 */
function makeResponseHeaders(headers: { readonly [k: string]: Header | Reference }): string {
  const entries = Object.entries(headers)
  if (entries.length === 0) return ''
  const result = entries
    .map(([key, header]) => `${JSON.stringify(key)}:${makeHeaderSchema(header)}`)
    .join(',')
  return `z.object({${result}})`
}

/**
 * Build a response object code using openapi.ts functions.
 */
function buildResponse(res: Responses): string {
  if (res.$ref) {
    return makeRef(res.$ref)
  }

  const headersCode =
    res.headers && Object.keys(res.headers).length > 0
      ? `headers:${makeResponseHeaders(res.headers)}`
      : undefined

  const result = [
    res.summary ? `summary:${JSON.stringify(res.summary)}` : undefined,
    res.description ? `description:${JSON.stringify(res.description)}` : undefined,
    headersCode,
    res.content ? `content:{${makeContent(res.content)}}` : undefined,
    res.links
      ? `links:{${Object.entries(res.links)
          .map(([key, link]) =>
            '$ref' in link && link.$ref
              ? `${JSON.stringify(key)}:${makeRef(link.$ref)}`
              : `${JSON.stringify(key)}:${makeLinkOrReference(link)}`,
          )
          .join(',')}}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function responses(components: Components, exportResponses: boolean): string {
  const { responses } = components
  if (!responses) return ''

  return Object.keys(responses)
    .map((k) => `${makeConst(exportResponses, k, 'Response')}${buildResponse(responses[k])}`)
    .join('\n\n')
}
