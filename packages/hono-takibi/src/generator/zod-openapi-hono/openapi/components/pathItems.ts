import { isPathItem } from '../../../../guard/index.js'
import { makeConst } from '../../../../helper/code.js'
import { makePathItem } from '../../../../helper/openapi.js'
import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../../../../utils/index.js'

export function pathItemsCode(
  components: Components,
  exportPathItems: boolean,
  readonly?: boolean,
): string {
  const pathItemsEntries = (): readonly { readonly name: string; readonly code: string }[] => {
    const { pathItems } = components
    if (!pathItems) return []
    const asConst = readonly ? ' as const' : ''
    return Object.entries(pathItems).flatMap(([k, pathItemOrRef]) =>
      isPathItem(pathItemOrRef)
        ? [
            {
              name: toIdentifierPascalCase(ensureSuffix(k, 'PathItem')),
              code: `${makeConst(exportPathItems, k, 'PathItem')}${makePathItem(pathItemOrRef)}${asConst}`,
            },
          ]
        : [],
    )
  }
  return pathItemsEntries()
    .map((e) => e.code)
    .join('\n\n')
}
