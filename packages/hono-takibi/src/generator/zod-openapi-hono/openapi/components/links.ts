import { makeConst } from '../../../../helper/code.js'
import { makeLinkOrReference } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function links(components: Components, exportLinks: boolean) {
  const { links } = components
  if (!links) return ''

  return Object.entries(links)
    .map(([k, link]) => {
      return `${makeConst(exportLinks, k, 'Link')}${makeLinkOrReference(link)}`
    })
    .join('\n\n')
}
