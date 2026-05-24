import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeConst } from '../../helper/code.js'
import { makeImports } from '../../helper/index.js'
import { makePathItem } from '../../helper/openapi.js'
import type { Components, PathItem } from '../../openapi/index.js'
import {
  ensureSuffix,
  makeBarrel,
  toIdentifierPascalCase,
  uncapitalize,
} from '../../utils/index.js'

export async function pathItems(
  components: Components,
  pathItemsConfig?: {
    readonly output: string
    readonly split?: boolean
  },
  componentsConfig?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  if (!pathItemsConfig?.output) return { ok: false, error: 'pathItems.output is required' } as const
  if (!components.pathItems) return { ok: false, error: 'No pathItems found' } as const
  const keys = Object.keys(components.pathItems)
  if (keys.length === 0) return { ok: true, value: 'No pathItems found' } as const
  const { output, split = false } = pathItemsConfig
  const pathItemsEntries = (
    components: Components,
    exportPathItems: boolean,
    readonly?: boolean,
  ): readonly { readonly name: string; readonly code: string }[] => {
    const { pathItems } = components
    if (!pathItems) return []
    const asConst = readonly ? ' as const' : ''
    const isPathItem = (v: unknown): v is PathItem =>
      typeof v === 'object' && v !== null && !('$ref' in v)
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
  const entries = pathItemsEntries(components, true, readonly)
  if (entries.length === 0) return { ok: true, value: 'No pathItems found' } as const
  if (!split) {
    const code = makeImports(entries.map((e) => e.code).join('\n\n'), output, componentsConfig)
    const result = await emit(code, path.dirname(output), output)
    if (!result.ok) return result
    return { ok: true, value: `Generated pathItems code written to ${output}` } as const
  }
  const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
  const results = await Promise.all([
    ...entries.map(async ({ name, code }) => {
      const filePath = `${outDir}/${uncapitalize(name)}.ts`
      const withImports = makeImports(code, filePath, componentsConfig)
      const result = await emit(withImports, path.dirname(filePath), filePath)
      return result.ok ? { ok: true as const, value: filePath } : result
    }),
    emit(
      makeBarrel(Object.fromEntries(entries.map((e) => [e.name, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])
  const failed = results.find((result) => !result.ok)
  if (failed) return failed
  return {
    ok: true,
    value: `Generated PathItem code written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
