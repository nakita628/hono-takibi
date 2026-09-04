import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { isPathItem } from '../../guard/index.js'
import { makeConst } from '../../helper/code.js'
import { makeImports } from '../../helper/index.js'
import { makePathItem } from '../../helper/openapi.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  makeBarrel,
  toIdentifierPascalCase,
  uncapitalize,
} from '../../utils/index.js'

export function pathItems(
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
  return Effect.gen(function* () {
    if (!pathItemsConfig?.output) {
      return yield* new GenerateError({ message: 'pathItems.output is required' })
    }
    if (!components.pathItems) return yield* new GenerateError({ message: 'No pathItems found' })
    const keys = Object.keys(components.pathItems)
    if (keys.length === 0) return 'No pathItems found'
    const { output, split = false } = pathItemsConfig
    const pathItemsEntries = (
      exportPathItems: boolean,
    ): readonly { readonly key: string; readonly name: string; readonly code: string }[] => {
      if (!components.pathItems) return []
      const asConst = readonly ? ' as const' : ''
      return Object.entries(components.pathItems).flatMap(([k, pathItemOrRef]) =>
        isPathItem(pathItemOrRef)
          ? [
              {
                key: k,
                name: toIdentifierPascalCase(ensureSuffix(k, 'PathItem')),
                code: `${makeConst(exportPathItems, k, 'PathItem')}${makePathItem(pathItemOrRef)}${asConst}`,
              },
            ]
          : [],
      )
    }
    const entries = pathItemsEntries(true)
    if (entries.length === 0) return 'No pathItems found'
    if (!split) {
      const code = makeImports(entries.map((e) => e.code).join('\n\n'), output, componentsConfig)
      yield* emit(code, path.dirname(output), output)
      return `Generated pathItems code written to ${output}`
    }
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    yield* Effect.all(
      [
        ...entries.map(({ key, code }) => {
          const filePath = `${outDir}/${uncapitalize(key)}.ts`
          return emit(
            makeImports(code, filePath, componentsConfig),
            path.dirname(filePath),
            filePath,
          )
        }),
        emit(
          makeBarrel(Object.fromEntries(entries.map((e) => [e.key, null]))),
          outDir,
          `${outDir}/index.ts`,
        ),
      ],
      { concurrency: 'unbounded' },
    )
    return `Generated PathItem code written to ${outDir}/*.ts (index.ts included)`
  })
}
