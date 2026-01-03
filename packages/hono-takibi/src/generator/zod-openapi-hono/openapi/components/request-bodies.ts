import { makeConst } from '../../../../helper/code.js'
import { makeRef } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

export function requestBodies(components: Components, exportRequestBodies: boolean): string {
  const requestBodies = components.requestBodies
  if (!requestBodies) return ''

  return Object.entries(requestBodies)
    .map(([k, body]) => {
      if (body.content) {
        const content = Object.entries(body.content)
          .map(([contentKey, mediaOrReference]) => {
            if ('schema' in mediaOrReference) {
              return `${JSON.stringify(contentKey)}:{schema:${zodToOpenAPI(mediaOrReference.schema)}}`
            }
            if ('$ref' in mediaOrReference) {
              return `${JSON.stringify(contentKey)}:${makeRef(mediaOrReference.$ref)}`
            }
            return undefined
          })
          .filter((v) => v !== undefined)
          .join(',')

        const props = [
          body.description ? `description:${JSON.stringify(body.description)}` : undefined,
          `content:{${content}}`,
          body.required ? `required:${body.required}` : undefined,
        ]
          .filter((v) => v !== undefined)
          .join(',')

        return `${makeConst(exportRequestBodies, k, 'RequestBody')}{${props}}`
      }
      return undefined
    })
    .join('\n\n')
}
