import { makeConst } from '../../../../helper/code.js'
import { makeRequestBody } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function requestBodiesCode(components: Components, exportRequestBodies: boolean): string {
  const requestBodies = components.requestBodies
  if (!requestBodies) return ''

  return Object.entries(requestBodies)
    .map(([k, body]) => {
      return `${makeConst(exportRequestBodies, k, 'RequestBody')}${makeRequestBody(body)}`
    })
    .join('\n\n')
}
